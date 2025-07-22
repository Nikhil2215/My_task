import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  Animated,
} from "react-native";
import styles from "./style";
import { Strings } from "../../constants/strings";
import { showToast } from "../toastManager/toastManager";

const EditTaskModal = ({ visible, task, onSave, onCancel }) => {
  const [editText, setEditText] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("medium");
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const priorityOptions = [
    { value: "high", label: "High", color: "#FF6B6B", emoji: "🔴" },
    { value: "medium", label: "Medium", color: "#FFD93D", emoji: "🟡" },
    { value: "low", label: "Low", color: "#6BCF7F", emoji: "🟢" },
  ];

  useEffect(() => {
    if (task) {
      setEditText(task.text);
      setSelectedPriority(task.priority || "medium");
    }
  }, [task]);

  const handleSave = () => {
    if (editText.trim()) {
      onSave(task.id, editText.trim(), selectedPriority);

      showToast(Strings.taskUpdated, "success");
    }
  };

  const handleCancel = () => {
    setEditText(task?.text || "");
    setSelectedPriority(task?.priority || "medium");
    onCancel();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleCancel}
    >
      <Animated.View style={[styles.modalOverlay, { opacity: opacityAnim }]}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          <Text style={styles.modalTitle}>Edit Task</Text>

          <TextInput
            style={styles.input}
            placeholder={Strings.enterTask}
            value={editText}
            onChangeText={setEditText}
            multiline
            maxLength={200}
            autoFocus={true}
          />

          <View style={styles.priorityContainer}>
            <Text style={styles.priorityLabel}>Priority:</Text>
            <View style={styles.priorityButtons}>
              {priorityOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.priorityButton,
                    selectedPriority === option.value &&
                      styles.selectedPriority,
                    { borderColor: option.color },
                  ]}
                  onPress={() => setSelectedPriority(option.value)}
                >
                  <Text style={styles.priorityEmoji}>{option.emoji}</Text>
                  <Text
                    style={[
                      styles.priorityText,
                      selectedPriority === option.value && {
                        color: option.color,
                      },
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.saveButton,
                !editText.trim() && styles.disabledButton,
              ]}
              onPress={handleSave}
              disabled={!editText.trim()}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default EditTaskModal;
