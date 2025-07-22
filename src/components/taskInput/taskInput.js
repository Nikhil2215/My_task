import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Animated,
} from "react-native";
import styles from "./style";
import { Strings } from "../../constants/strings";
import { showToast } from "../toastManager/toastManager";
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

export default TaskInput;
