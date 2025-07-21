import React, { useState, useMemo, useEffect, useCallback } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import TaskInput from "../components/taskInput";
import TaskList from "../components/taskList";
import FilterTabs from "../components/filterTabs";
import NotificationManager from "../components/notificationManager";
import StorageManager from "../components/storageManager";
import { Colors } from "../constants/colors";

const SCHEDULE_TIME = 10; // seconds
const TASKS_PER_PAGE = 10;

const TaskScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTasksFromStorage();

    const subscription = NotificationManager.addNotificationResponseListener(
      (response) => {
        const taskId = response.notification.request.content.data?.taskId;
        if (taskId) {
          console.log("User tapped notification for task:", taskId);
        }
      }
    );

    return () => {
      NotificationManager.removeNotificationResponseListener(subscription);
    };
  }, []);

  // Optimized storage operations
  const loadTasksFromStorage = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await StorageManager.loadTasks();
      if (result.success) {
        setTasks(result.tasks);
        console.log("Tasks loaded from storage:", result.tasks.length);
      } else {
        console.error("Failed to load tasks from storage:", result.error);
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveTasksToStorage = useCallback(async (updatedTasks) => {
    try {
      const result = await StorageManager.saveTasks(updatedTasks);
      if (!result.success) {
        console.error("Failed to save tasks to storage:", result.error);
      }
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  }, []);

  // Optimized notification management
  const scheduleNotificationForTask = useCallback(async (task) => {
    try {
      return await NotificationManager.scheduleTaskNotification(
        task,
        SCHEDULE_TIME
      );
    } catch (error) {
      console.error("Error scheduling notification:", error);
      return null;
    }
  }, []);

  const cancelTaskNotification = useCallback((notificationId) => {
    if (notificationId) {
      try {
        NotificationManager.cancelNotification(notificationId);
      } catch (error) {
        console.error("Error canceling notification:", error);
      }
    }
  }, []);

  // Optimized task operations
  const addTask = useCallback(
    async (text, priority = "medium") => {
      const newTask = {
        id: Date.now(),
        text,
        completed: false,
        priority,
        createdAt: new Date(),
        notificationId: null,
      };

      const notificationId = await scheduleNotificationForTask(newTask);
      newTask.notificationId = notificationId;

      const updatedTasks = [newTask, ...tasks];
      setTasks(updatedTasks);
      await saveTasksToStorage(updatedTasks);
      setCurrentPage(1); // Reset pagination
    },
    [tasks, scheduleNotificationForTask, saveTasksToStorage]
  );

  const toggleTaskCompletion = useCallback(
    async (taskId) => {
      const updatedTasks = await Promise.all(
        tasks.map(async (task) => {
          if (task.id !== taskId) return task;

          const updatedTask = { ...task, completed: !task.completed };

          if (updatedTask.completed) {
            // Task completed - cancel notification
            cancelTaskNotification(task.notificationId);
            updatedTask.notificationId = null;
          } else {
            // Task uncompleted - reschedule notification
            cancelTaskNotification(task.notificationId);

            // Schedule new notification with current task data
            const notificationId = await scheduleNotificationForTask(
              updatedTask
            );
            updatedTask.notificationId = notificationId;
          }

          return updatedTask;
        })
      );

      setTasks(updatedTasks);
      await saveTasksToStorage(updatedTasks);
    },
    [
      tasks,
      cancelTaskNotification,
      scheduleNotificationForTask,
      saveTasksToStorage,
    ]
  );

  const deleteTask = useCallback(
    async (taskId) => {
      const taskToDelete = tasks.find((task) => task.id === taskId);

      if (taskToDelete?.notificationId) {
        cancelTaskNotification(taskToDelete.notificationId);
      }

      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
      await saveTasksToStorage(updatedTasks);
    },
    [tasks, cancelTaskNotification, saveTasksToStorage]
  );

  const editTask = useCallback(
    async (taskId, newText, newPriority) => {
      const updatedTasks = await Promise.all(
        tasks.map(async (task) => {
          if (task.id !== taskId) return task;

          const updatedTask = {
            ...task,
            text: newText,
            priority: newPriority || task.priority,
          };

          // Update notification if task is not completed and has notification
          if (!updatedTask.completed && task.notificationId) {
            // Cancel old notification
            cancelTaskNotification(task.notificationId);

            // Schedule new notification with updated text
            const notificationId = await scheduleNotificationForTask(
              updatedTask
            );
            updatedTask.notificationId = notificationId;
          }

          return updatedTask;
        })
      );

      setTasks(updatedTasks);
      await saveTasksToStorage(updatedTasks);
    },
    [
      tasks,
      cancelTaskNotification,
      scheduleNotificationForTask,
      saveTasksToStorage,
    ]
  );

  // Optimized filtering and sorting
  const filteredTasks = useMemo(() => {
    // Filter tasks based on completion status
    let filtered;
    if (filter === "completed") {
      filtered = tasks.filter((task) => task.completed);
    } else if (filter === "pending") {
      filtered = tasks.filter((task) => !task.completed);
    } else {
      filtered = tasks;
    }

    // Sort by priority then by creation date
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return filtered.sort((a, b) => {
      const priorityDiff =
        (priorityOrder[b.priority] || 2) - (priorityOrder[a.priority] || 2);
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [tasks, filter]);

  const paginatedTasks = useMemo(() => {
    return filteredTasks.slice(0, currentPage * TASKS_PER_PAGE);
  }, [filteredTasks, currentPage]);

  const hasMoreTasks = useMemo(() => {
    return filteredTasks.length > currentPage * TASKS_PER_PAGE;
  }, [filteredTasks.length, currentPage]);

  const loadMoreTasks = useCallback(() => {
    if (hasMoreTasks) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [hasMoreTasks]);

  // Optimized task counts calculation
  const taskCounts = useMemo(() => {
    let total = 0;
    let completed = 0;
    let pending = 0;

    for (const task of tasks) {
      total++;
      if (task.completed) {
        completed++;
      } else {
        pending++;
      }
    }

    return { total, completed, pending };
  }, [tasks]);

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TaskInput onAddTask={addTask} />
        <FilterTabs
          activeFilter={filter}
          onFilterChange={handleFilterChange}
          taskCounts={taskCounts}
        />
        <TaskList
          tasks={paginatedTasks}
          onToggleComplete={toggleTaskCompletion}
          onDelete={deleteTask}
          onEdit={editTask}
          onLoadMore={loadMoreTasks}
          hasMoreTasks={hasMoreTasks}
          isLoading={isLoading}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  content: {
    flex: 1,
  },
});

export default TaskScreen;
