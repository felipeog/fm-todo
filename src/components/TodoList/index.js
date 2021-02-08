import React, { useCallback } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import Checkbox from '../Checkbox'
import * as style from './index.module.scss'

const TodoList = ({ todos, setTodos }) => {
  const onDragEnd = useCallback(
    (result) => {
      if (!result.destination) return

      const items = Array.from(todos)
      const [reorderedItem] = items.splice(result.source.index, 1)
      items.splice(result.destination.index, 0, reorderedItem)

      setTodos(items)
    },
    [todos],
  )

  const toggleTodoCheck = (event, id) => {
    event.preventDefault()

    const items = Array.from(todos)
    const itemIndex = todos.findIndex((todo) => todo.id === id)
    const [itemToToggle] = items.splice(itemIndex, 1)
    const toggledItem = {
      ...itemToToggle,
      checked: !itemToToggle.checked,
    }
    items.splice(itemIndex, 0, toggledItem)

    setTodos(items)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-1">
        {(provided) => (
          <ul
            className={`TodoList ${style.root}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {todos.map(({ title, id, checked }, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                  <li
                    className={style.item}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Checkbox
                      isChecked={checked}
                      onClick={(event) => toggleTodoCheck(event, id)}
                    />
                    <span className={style.title}>{title}</span>
                  </li>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default TodoList
