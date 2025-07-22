import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
export default styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: Colors.surface,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.textSecondary,
    marginRight: 6,
  },
  activeTabText: {
    color: Colors.background,
  },
  badge: {
    backgroundColor: Colors.border,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  activeBadge: {
    backgroundColor: Colors.background,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.textSecondary,
  },
  activeBadgeText: {
    color: Colors.primary,
  },
});
