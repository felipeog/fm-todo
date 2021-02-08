import React, { useCallback } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-1">
        {(provided) => (
          <ul
            className={`TodoList ${style.root}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {todos.map(({ title, id }, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                  <li
                    className={style.item}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {title}
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
