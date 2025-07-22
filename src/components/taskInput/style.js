import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
export default styles = StyleSheet.create({
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
