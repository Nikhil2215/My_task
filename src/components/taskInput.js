import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Animated,
} from "react-native";
import { Colors } from "../constants/colors";
import { Strings } from "../constants/strings";
import { showToast } from "./toastManager";
import { Keyboard } from "react-native";

const TaskInput = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("medium");
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    // Continuous pulse animation for add button when text is present
    if (taskText.trim()) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      return () => pulse.stop();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0.7,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [taskText]);

  const priorityOptions = [
    { value: "high", label: "High", color: "#FF6B6B", emoji: "🔴" },
    { value: "medium", label: "Medium", color: "#FFD93D", emoji: "🟡" },
    { value: "low", label: "Low", color: "#6BCF7F", emoji: "🟢" },
  ];

  const handleAddTask = () => {
    if (taskText.trim()) {
      onAddTask(taskText.trim(), selectedPriority);
      setTaskText("");
      setSelectedPriority("medium");
      showToast(Strings.taskAdded, "success");
      Keyboard.dismiss();

      // Animate button press
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={Strings.enterTask}
        value={taskText}
        onChangeText={setTaskText}
        multiline
        maxLength={200}
      />

      <View style={styles.priorityContainer}>
        <Text style={styles.priorityLabel}>Priority:</Text>
        <View style={styles.priorityButtons}>
          {priorityOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.priorityButton,
                selectedPriority === option.value && styles.selectedPriority,
                { borderColor: option.color },
              ]}
              onPress={() => setSelectedPriority(option.value)}
            >
              <Text style={styles.priorityEmoji}>{option.emoji}</Text>
              <Text
                style={[
                  styles.priorityText,
                  selectedPriority === option.value && { color: option.color },
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Animated.View
        style={{ transform: [{ scale: pulseAnim }], opacity: fadeAnim }}
      >
        <TouchableOpacity
          style={[styles.addButton, !taskText.trim() && styles.disabledButton]}
          onPress={handleAddTask}
          disabled={!taskText.trim()}
        >
          <Text style={styles.addButtonText}>✨ {Strings.addTask}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    padding: 16,
  },

  input: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 16,
    padding: 18,
    fontSize: 16,
    backgroundColor: Colors.surface,
    marginBottom: 12,
    minHeight: 60,
    color: Colors.text,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s ease",
  },
  priorityContainer: {
    marginBottom: 12,
  },
  priorityLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
  },
  priorityButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priorityButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    marginHorizontal: 4,
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    transition: "all 0.2s ease",
  },
  selectedPriority: {
    backgroundColor: Colors.background,
    transform: [{ scale: 1.05 }],
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
  },
  priorityEmoji: {
    fontSize: 16,
    marginRight: 4,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  addButton: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    boxShadow: "0 6px 20px rgba(99, 102, 241, 0.3)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  disabledButton: {
    backgroundColor: Colors.textSecondary,
  },
  addButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default TaskInput;
