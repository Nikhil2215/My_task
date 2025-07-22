import React, { useState, useEffect } from "react";
import { View, Text, Animated, TouchableOpacity } from "react-native";
import { Colors } from "../../constants/colors";
import styles from "./style";

let toastRef = null;

export const showToast = (message, type = "success") => {
  if (toastRef) {
    toastRef.show(message, type);
  }
};

const ToastManager = () => {
  const [toasts, setToasts] = useState([]);
  const [toastId, setToastId] = useState(0);

  useEffect(() => {
    toastRef = {
      show: (message, type) => {
        const id = toastId;
        setToastId((prev) => prev + 1);

        const newToast = {
          id,
          message,
          type,
          opacity: new Animated.Value(0),
          translateY: new Animated.Value(-50),
        };

        setToasts((prev) => [...prev, newToast]);

        // Animate in
        Animated.parallel([
          Animated.timing(newToast.opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(newToast.translateY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();

        // Auto dismiss after 3 seconds
        setTimeout(() => {
          dismissToast(id);
        }, 3000);
      },
    };

    return () => {
      toastRef = null;
    };
  }, [toastId]);

  const dismissToast = (id) => {
    setToasts((prev) => {
      const toast = prev.find((t) => t.id === id);
      if (toast) {
        Animated.parallel([
          Animated.timing(toast.opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(toast.translateY, {
            toValue: -50,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setToasts((current) => current.filter((t) => t.id !== id));
        });
      }
      return prev;
    });
  };

  const getToastStyle = (type) => {
    switch (type) {
      case "success":
        return { backgroundColor: Colors.success };
      case "error":
        return { backgroundColor: Colors.error };
      case "warning":
        return { backgroundColor: Colors.warning };
      default:
        return { backgroundColor: Colors.primary };
    }
  };

  const getToastIcon = (type) => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      default:
        return "ℹ️";
    }
  };

  return (
    <View style={styles.container} pointerEvents="box-none">
      {toasts.map((toast) => (
        <Animated.View
          key={toast.id}
          style={[
            styles.toast,
            getToastStyle(toast.type),
            {
              opacity: toast.opacity,
              transform: [{ translateY: toast.translateY }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.toastContent}
            onPress={() => dismissToast(toast.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.toastIcon}>{getToastIcon(toast.type)}</Text>
            <Text style={styles.toastText}>{toast.message}</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
};

export default ToastManager;
