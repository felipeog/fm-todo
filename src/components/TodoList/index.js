import React, { useCallback } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import Checkbox from '../Checkbox'
import Cross from 'url:../../assets/img/icon-cross.svg'
import * as style from './index.module.scss'

const TodoList = ({ todos, setTodos, activeFilter, isDragDisabled }) => {
  if (!todos.length) return <p className={style.empty}>Empty list</p>

  const onDragEnd = useCallback((result) => {
    const { destination, source } = result

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return
    }

    setTodos((todos) => {
      const items = Array.from(todos)
      const [reorderedItem] = items.splice(source.index, 1)
      items.splice(destination.index, 0, reorderedItem)

      return items
    })
  }, [])

  const toggleTodoCheck = (event, id) => {
    event.preventDefault()

    setTodos((todos) => {
      const items = Array.from(todos)
      const itemIndex = todos.findIndex((todo) => todo.id === id)
      const [itemToToggle] = items.splice(itemIndex, 1)
      const toggledItem = {
        ...itemToToggle,
        checked: !itemToToggle.checked,
      }
      items.splice(itemIndex, 0, toggledItem)

      return items
    })
  }

  const removeTodo = (event, id) => {
    event.preventDefault()

    setTodos((todos) => {
      const items = Array.from(todos)
      const itemIndex = todos.findIndex((todo) => todo.id === id)
      items.splice(itemIndex, 1)

      return items
    })
  }

  const getFilteredTodos = () => {
    switch (activeFilter.value) {
      case 'all':
        return todos

      case 'active':
        return todos.filter(({ checked }) => !checked)

      case 'completed':
        return todos.filter(({ checked }) => checked)

      default:
        throw new Error('App @ useEffect >>>>> Invalid filter value')
    }
  }

  const filteredTodos = getFilteredTodos()

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-1">
        {(provided) => (
          <ul
            className={`TodoList ${style.root}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {filteredTodos.map(({ title, id, checked }, index) => (
              <Draggable
                key={id}
                draggableId={id}
                index={index}
                isDragDisabled={isDragDisabled}
              >
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

                    <span
                      className={`${style.title} ${
                        checked ? style.checked : ''
                      }`}
                    >
                      {title}
                    </span>

                    <button
                      className={style.removeTodo}
                      onClick={(event) => removeTodo(event, id)}
                    >
                      <img src={Cross} alt="Remove todo" />
                    </button>
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
