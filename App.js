import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import TaskScreen from "./src/screens/taskScreen";
import ToastManager from "./src/components/toastManager/toastManager";
import { Colors } from "./src/constants/colors";
import { Strings } from "./src/constants/strings";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{Strings.appTitle}</Text>
      </View>
      <TaskScreen />
      <ToastManager />
      <StatusBar style="dark" backgroundColor={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 30,
    paddingBottom: 16,
    paddingHorizontal: 16,
    alignItems: "center",
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.background,
  },
});
