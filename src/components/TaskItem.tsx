import React, { useEffect, useRef, useState } from 'react'

import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

import editIcon from '../assets/icons/edit.png'

import Icon from 'react-native-vector-icons/Feather'

import trashIcon from '../assets/icons/trash/trash.png'
import { Task } from './TasksList'

interface TaskItemProps {
  index: number
  item: Task
  toggleTaskDone: (id: number) => void
  removeTask: (id: number) => void
  editTask: (taskId: number, newTaskTitle: string) => void
}

export function TaskItem({
  index,
  editTask,
  removeTask,
  item,
  toggleTaskDone
}: TaskItemProps) {
  const [isBeingEdited, setIsBeingEdited] = useState(false)
  const [title, setTitle] = useState(item.title)
  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing() {
    setIsBeingEdited(true)
  }

  function handleCancelEditing() {
    setIsBeingEdited(false)
    setTitle(item.title)
  }

  function handleSubmitEditing() {
    editTask(item.id, title)
    setIsBeingEdited(false)
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isBeingEdited) {
        textInputRef.current.focus()
      } else {
        textInputRef.current.blur()
      }
    }
  }, [isBeingEdited])

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            style={item.done ? styles.taskTextDone : styles.taskText}
            value={title}
            onChangeText={setTitle}
            editable={isBeingEdited}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.iconsContainer}>
        {isBeingEdited ? (
          <TouchableOpacity
            style={{ paddingHorizontal: 24 }}
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Image source={editIcon} />
          </TouchableOpacity>
        )}
        <View style={styles.iconDivider} />
        <TouchableOpacity
          testID={`trash-${index}`}
          disabled={isBeingEdited}
          onPress={() => removeTask(item.id)}
        >
          <Image
            source={trashIcon}
            style={{ opacity: isBeingEdited ? 0.2 : 1 }}
          />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)'
  },
  iconsContainer: {
    width: 74,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
    marginHorizontal: 20
  }
})
