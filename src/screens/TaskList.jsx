import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../config/redux/ThemeContext';

export default function TaskList() {
  const tasks = useSelector(state => state.tasks);
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext)

  const renderItem = ({ item }) => (
    <View style={[styles.taskItem, { backgroundColor: theme.colors.inputBg, borderColor: theme.colors.border }]}>
      <Text style={[styles.taskText, { color: theme.colors.text }]}>{item.text} - {item.complete}</Text>
    </View>

  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.heading, { color: theme.colors.text }]}>Your Tasks</Text>

      {tasks.length === 0 ? (
        <Text style={[styles.noTask, { color: theme.colors.placeholder }]}>No tasks added yet.</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={tasks}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('AddTask')}
      >
        <Text style={[styles.addButtonText, { color: theme.colors.buttonText }]}>+ Add Task</Text>
      </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  heading: {
    fontSize: 26,
    color: '#1E1E1E',
    marginBottom: 20,
    textAlign: 'center',
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  deleteButton: {
    color: '#EF4444',
    fontSize: 15,
    marginLeft: 12,
  },
  noTask: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
  },
  list: {
    paddingBottom: 100,
  },
  addButton: {
    backgroundColor: '#1f618d',
    paddingVertical: 14,
    borderRadius: 10,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

