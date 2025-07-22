import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import styles from "./style";
import { Strings } from "../../constants/strings";

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

export default FilterTabs;
