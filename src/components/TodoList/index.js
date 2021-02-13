import React, { useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import Checkbox from '../Checkbox'
import Cross from 'url:../../assets/img/icon-cross.svg'
import { useTodoContext } from '../../contexts/TodoContext'
import * as style from './index.module.scss'

const TodoList = () => {
  // contexts
  const {
    filteredTodos,
    removeTodo,
    toggleTodo,
    reorderTodo,
    isReorderDisabled,
  } = useTodoContext()

  // functions
  const onDragEnd = useCallback((result) => {
    const { destination, source } = result

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      // if dragged outside droppable
      // or dragged to the same slot
      return
    }

    reorderTodo({ destination, source })
  }, [])

  // rendering
  if (!filteredTodos.length) return <p className={style.empty}>Empty list</p>

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-1">
        {(provided) => (
          <ul
            className={`TodoList ${style.root}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <AnimatePresence>
              {filteredTodos.map(({ title, id, checked }, index) => (
                <Draggable
                  key={id}
                  draggableId={id}
                  index={index}
                  isDragDisabled={isReorderDisabled}
                >
                  {(provided) => {
                    if (provided?.dragHandleProps?.role) {
                      delete provided.dragHandleProps.role
                    }

                    return (
                      <motion.li
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.1 }}
                        className={style.item}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Checkbox
                          isChecked={checked}
                          onClick={() => toggleTodo({ id })}
                        />

                        <span
                          className={`${style.title} ${
                            checked ? style.checked : ''
                          }`}
                        >
                          {title}
                        </span>

                        <button
                          className={style.removeTodo}
                          onClick={() => removeTodo({ id })}
                        >
                          <img
                            className={style.removeTodoIcon}
                            src={Cross}
                            alt="Remove todo"
                          />
                        </button>
                      </motion.li>
                    )
                  }}
                </Draggable>
              ))}

              {provided.placeholder}
            </AnimatePresence>
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default TodoList
