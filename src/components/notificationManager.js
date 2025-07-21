import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { Strings } from "../constants/strings";

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

class NotificationManager {
  constructor() {
    this.requestPermissions();
  }

  async requestPermissions() {
    if (Platform.OS !== "web") {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        await Notifications.requestPermissionsAsync();
      }
    }
  }

  async scheduleTaskNotification(task, delayInSeconds) {
    if (Platform.OS === "web") {
      // Web notifications are handled differently, skip for now
      return null;
    }

    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: Strings.notificationTitle,
          body: `${Strings.notificationBody}${task.text}`,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: Number(delayInSeconds),
        },
      });
      return notificationId;
    } catch (error) {
      console.log("Error scheduling notification:", error);
      return null;
    }
  }

  async cancelNotification(notificationId) {
    if (Platform.OS === "web" || !notificationId) return;

    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch (error) {
      console.log("Error cancelling notification:", error);
    }
  }

  async cancelAllNotifications() {
    if (Platform.OS === "web") return;

    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.log("Error cancelling all notifications:", error);
    }
  }

  // Listen to notification responses (when user taps notification)
  addNotificationResponseListener(callback) {
    if (Platform.OS === "web") return null;

    return Notifications.addNotificationResponseReceivedListener(callback);
  }

  // Remove notification listener
  removeNotificationResponseListener(subscription) {
    if (subscription) {
      subscription.remove();
    }
  }
}

// Export a singleton instance
export default new NotificationManager();
