import React from 'react'
import { FlatList } from 'react-native'

import { ItemWrapper } from './ItemWrapper'
import { TaskItem } from './TaskItem'

export interface Task {
  id: number
  title: string
  done: boolean
}

interface TasksListProps {
  tasks: Task[]
  toggleTaskDone: (id: number) => void
  removeTask: (id: number) => void
  editTask: (taskId: number, newTaskTitle: string) => void
}

export function TasksList({
  tasks,
  toggleTaskDone,
  removeTask,
  editTask
}: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem
              index={index}
              item={item}
              editTask={editTask}
              removeTask={removeTask}
              toggleTaskDone={toggleTaskDone}
            />
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}
