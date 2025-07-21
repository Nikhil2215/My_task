import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";
import { Strings } from "../constants/strings";

const FilterTabs = ({ activeFilter, onFilterChange, taskCounts }) => {
  const filters = [
    { key: "all", label: Strings.allTasks, count: taskCounts.total },
    { key: "pending", label: Strings.pendingTasks, count: taskCounts.pending },
    {
      key: "completed",
      label: Strings.completedTasks,
      count: taskCounts.completed,
    },
  ];

  return (
    <View style={styles.container}>
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter.key}
          style={[styles.tab, activeFilter === filter.key && styles.activeTab]}
          onPress={() => onFilterChange(filter.key)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabText,
              activeFilter === filter.key && styles.activeTabText,
            ]}
          >
            {filter.label}
          </Text>
          <View
            style={[
              styles.badge,
              activeFilter === filter.key && styles.activeBadge,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                activeFilter === filter.key && styles.activeBadgeText,
              ]}
            >
              {filter.count}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default FilterTabs;
