import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'

import { Header } from '../components/Header'
import { Task, TasksList } from '../components/TasksList'
import { TodoInput } from '../components/TodoInput'

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  function handleAddTask(newTaskTitle: string) {
    const alreadyExists = tasks.find(task => task.title === newTaskTitle)
    if (alreadyExists) {
      Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome'
      )
      return
    }
    const newTask = {
      id: Number(new Date().getTime()),
      title: newTaskTitle,
      done: false
    }
    setTasks([...tasks, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = [...tasks]
    const taskDone = updatedTasks.find(item => item.id === id)
    if (taskDone) {
      taskDone.done = !taskDone.done
      setTasks(updatedTasks)
    }
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: () =>
            setTasks(oldState => oldState.filter(task => task.id !== id))
        }
      ]
    )
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updatedTasks = [...tasks]
    const editTask = updatedTasks.find(item => item.id === taskId)
    if (editTask) {
      editTask.title = taskNewTitle
      setTasks(updatedTasks)
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
