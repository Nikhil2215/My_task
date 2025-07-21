import AsyncStorage from "@react-native-async-storage/async-storage";
import { Strings } from "../constants/strings";

class StorageManager {
  static TASKS_KEY = "@MyTasks:tasks";

  // Save tasks to local storage
  static async saveTasks(tasks) {
    try {
      const jsonValue = JSON.stringify(tasks);
      await AsyncStorage.setItem(this.TASKS_KEY, jsonValue);
      return { success: true };
    } catch (error) {
      console.error("Error saving tasks:", error);
      return { success: false, error };
    }
  }

  // Load tasks from local storage
  static async loadTasks() {
    try {
      const jsonValue = await AsyncStorage.getItem(this.TASKS_KEY);
      if (jsonValue !== null) {
        const tasks = JSON.parse(jsonValue);
        // Convert createdAt strings back to Date objects and ensure priority field exists
        const tasksWithDates = tasks.map((task) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          priority: task.priority || "medium", // Default to medium if priority is missing
        }));
        return { success: true, tasks: tasksWithDates };
      }
      return { success: true, tasks: [] };
    } catch (error) {
      console.error("Error loading tasks:", error);
      return { success: false, tasks: [], error };
    }
  }

  // Clear all tasks from storage
  static async clearTasks() {
    try {
      await AsyncStorage.removeItem(this.TASKS_KEY);
      return { success: true };
    } catch (error) {
      console.error("Error clearing tasks:", error);
      return { success: false, error };
    }
  }

  // Get storage info
  static async getStorageInfo() {
    try {
      const jsonValue = await AsyncStorage.getItem(this.TASKS_KEY);
      const size = jsonValue ? jsonValue.length : 0;
      const taskCount = jsonValue ? JSON.parse(jsonValue).length : 0;
      return {
        success: true,
        info: {
          size,
          taskCount,
          lastUpdated: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error("Error getting storage info:", error);
      return { success: false, error };
    }
  }
}

export default StorageManager;
