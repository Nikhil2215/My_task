import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { showToast } from "./toastManager";
import { Colors } from "../constants/colors";
import { Strings } from "../constants/strings";
import EditTaskModal from "./editTaskModal";

const TaskItem = ({ task, onToggleComplete, onDelete, onEdit }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entry animation
    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const priorityOptions = [
    { value: "high", label: "High", color: "#FF6B6B", emoji: "🔴" },
    { value: "medium", label: "Medium", color: "#FFD93D", emoji: "🟡" },
    { value: "low", label: "Low", color: "#6BCF7F", emoji: "🟢" },
  ];

  const getPriorityConfig = (priority) => {
    return (
      priorityOptions.find((option) => option.value === priority) ||
      priorityOptions[1]
    );
  };

  const handleDelete = () => {
    onDelete(task.id);
    showToast(Strings.taskDeleted, "success");
  };

  const handleToggleComplete = () => {
    animatePress();

    // Completion animation
    if (!task.completed) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }

    onToggleComplete(task.id);
    showToast(
      task.completed ? Strings.markIncomplete : Strings.taskCompleted,
      "success"
    );
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleSaveEdit = (taskId, newText, newPriority) => {
    onEdit(taskId, newText, newPriority);
    setShowEditModal(false);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
  };

  const currentPriority = getPriorityConfig(task.priority || "medium");

  return (
    <Animated.View
      style={[
        styles.container,
        task.completed && styles.completedContainer,
        {
          transform: [
            { scale: scaleAnim },
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
          opacity: slideAnim,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.taskContent}
        onPress={handleToggleComplete}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, task.completed && styles.checkedBox]}>
          {task.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>

        <View style={styles.taskInfo}>
          <View style={styles.priorityIndicator}>
            <Text style={styles.priorityEmoji}>{currentPriority.emoji}</Text>
            <Text
              style={[styles.priorityLabel, { color: currentPriority.color }]}
            >
              {currentPriority.label}
            </Text>
          </View>

          <Text
            style={[styles.taskText, task.completed && styles.completedText]}
          >
            {task.text}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleEdit}
          activeOpacity={0.7}
        >
          <Text style={styles.editButtonText}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
          activeOpacity={0.7}
        >
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>

      <EditTaskModal
        visible={showEditModal}
        task={task}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 16,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  completedContainer: {
    backgroundColor: Colors.completedBg,
    borderLeftColor: Colors.success,
    opacity: 0.8,
  },
  taskContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primary,
    marginRight: 12,
    marginTop: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  checkedBox: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  checkmark: {
    color: Colors.background,
    fontSize: 14,
    fontWeight: "bold",
  },
  taskInfo: {
    flex: 1,
  },
  priorityIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  priorityEmoji: {
    fontSize: 12,
    marginRight: 4,
  },
  priorityLabel: {
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  taskText: {
    fontSize: 16,
    color: Colors.text,
    flex: 1,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: Colors.completed,
  },

  actionButtons: {
    flexDirection: "row",
    marginLeft: 8,
  },
  editButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    marginRight: 4,
  },
  editButtonText: {
    fontSize: 16,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.error,
    marginLeft: 4,
  },
  deleteButtonText: {
    fontSize: 16,
  },
});

export default TaskItem;
