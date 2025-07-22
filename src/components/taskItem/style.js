import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export default styles = StyleSheet.create({
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
  disabledButton: {
    backgroundColor: Colors.textSecondary,
  },
});
