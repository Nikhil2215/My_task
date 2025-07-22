import { FlatList, View, Text, ActivityIndicator } from "react-native";
import TaskItem from "../taskItem/taskItem";
import { Colors } from "../../constants/colors";
import { Strings } from "../../constants/strings";
import styles from "./style";

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

export default TaskList;
