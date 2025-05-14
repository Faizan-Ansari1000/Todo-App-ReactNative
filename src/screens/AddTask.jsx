import React, { useContext, useLayoutEffect, useState } from 'react';
import { Text, TextInput, ToastAndroid, TouchableOpacity, View, StyleSheet, ScrollView, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask } from '../config/redux/taskSlice';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../config/redux/ThemeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function AddTask() {

  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [complete, setComplete] = useState('');
  const taskList = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  const { theme, toggleTheme, isDark } = useContext(ThemeContext);

  const addNewTask = async () => {
    if (!text) {
      return ToastAndroid.show('Please enter a task', ToastAndroid.SHORT);
    }

    dispatch(addTask({ id: Date.now(), text: text, complete: complete }));
    setText('');
    setComplete('');
  };


  const deleteTaskFromList = async (index) => {
    dispatch(deleteTask(index));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ alignItems: 'flex-end', }}>
          <TouchableOpacity onPress={toggleTheme}>
            {isDark ? <MaterialIcons name="toggle-on" color={'white'} size={28} /> : <MaterialIcons name="toggle-on" color={'#1f618d'} size={28} />}
          </TouchableOpacity>
        </View>
      )
    });
  }, [navigation, toggleTheme, isDark]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Add New Task</Text>

      <TextInput
        style={[styles.input, { backgroundColor: theme.colors.inputBg, color: theme.colors.text, borderColor: theme.colors.border }]}
        placeholder="Add Task..."
        placeholderTextColor={theme.colors.placeholder}
        value={text}
        onChangeText={(e) => setText(e)}
      />
      <TextInput
        style={[styles.input, { backgroundColor: theme.colors.inputBg, color: theme.colors.text, borderColor: theme.colors.border }]}
        placeholder="Yes o No..."
        placeholderTextColor={theme.colors.placeholder}
        value={complete}
        onChangeText={(e) => setComplete(e)}
      />

      <TouchableOpacity onPress={addNewTask} style={[styles.button, { backgroundColor: theme.colors.primary }]}>
        <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>Add Task</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.listContainer}>
          {taskList.map((task, index) => (
            <View key={task.id} style={[styles.taskItem, { backgroundColor: theme.colors.inputBg, borderColor: theme.colors.border }]}>
              <Text style={[styles.taskText, { color: theme.colors.text }]}>{task.text} - {task.complete}</Text>
              <TouchableOpacity onPress={() => deleteTaskFromList(index)}>
                <MaterialIcons name="delete-sweep" size={24} color={'red'} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#F7F9FC',
  },
  title: {
    fontSize: 26,
    color: '#1E1E1E',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#1f618d',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
  },
  listContainer: {
    marginTop: 10,
  },
  taskItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  taskText: {
    fontSize: 16,
    color: '#333',
    flexShrink: 1,
  },
  deleteButton: {
    color: '#EF4444',
    fontSize: 15,
    marginLeft: 12,
  },
});
