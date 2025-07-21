import React from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import TaskItem from "./taskItem";
import { Colors } from "../constants/colors";
import { Strings } from "../constants/strings";

const TaskList = ({
  tasks,
  onToggleComplete,
  onDelete,
  onEdit,
  onLoadMore,
  hasMoreTasks,
  isLoading,
}) => {
  const renderEmptyList = () => {
    if (isLoading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.emptyMessage}>{Strings.LoadingTasks}</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>📝</Text>
        <Text style={styles.emptyMessage}>{Strings.noTasks}</Text>
      </View>
    );
  };

  const renderTask = ({ item }) => (
    <TaskItem
      task={item}
      onToggleComplete={onToggleComplete}
      onDelete={onDelete}
      onEdit={onEdit}
    />
  );

  const renderFooter = () => {
    if (!hasMoreTasks || tasks.length === 0) return null;

    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color={Colors.primary} />
        <Text style={styles.loadingText}>{Strings.loadingMore}</Text>
      </View>
    );
  };

  const handleEndReached = () => {
    if (hasMoreTasks) {
      onLoadMore();
    }
  };

  return (
    <FlatList
      data={tasks}
      renderItem={renderTask}
      keyExtractor={(item) => item.id.toString()}
      style={styles.list}
      contentContainerStyle={
        tasks.length === 0 ? styles.emptyList : styles.listContent
      }
      ListEmptyComponent={renderEmptyList}
      ListFooterComponent={renderFooter}
      showsVerticalScrollIndicator={false}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  listContent: {
    paddingVertical: 8,
  },
  emptyList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyMessage: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
    paddingHorizontal: 32,
  },
  loadingFooter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.textSecondary,
  },
});

export default TaskList;
