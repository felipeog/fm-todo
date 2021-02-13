import React, { createContext, useContext, useState, useEffect } from 'react'

const TodoContext = createContext()

export const TodoProvider = (props) => {
  // consts
  const LSKey = 'fm-todo/items'
  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ]
  const defaultFilter = filterOptions[0]

  // state
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState(defaultFilter)

  // functions
  const addTodo = ({ title, checked }) => {
    setTodos((todos) => [
      ...todos,
      {
        title,
        checked,
        id: `draggable-${Math.round(Math.random() * 999_999)}`,
      },
    ])
  }
  const removeTodo = ({ id }) => {
    setTodos((todos) => {
      const items = Array.from(todos)
      const itemIndex = todos.findIndex((todo) => todo.id === id)
      items.splice(itemIndex, 1)

      return items
    })
  }
  const toggleTodo = ({ id }) => {
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
  const reorderTodo = ({ destination, source }) => {
    setTodos((todos) => {
      const items = Array.from(todos)
      const [reorderedItem] = items.splice(source.index, 1)
      items.splice(destination.index, 0, reorderedItem)

      return items
    })
  }
  const clearCompleted = () => {
    setTodos((todos) => todos.filter(({ checked }) => !checked))
  }

  // effects
  useEffect(() => {
    // check for items in local storage
    if (localStorage.getItem(LSKey)) {
      const todos = JSON.parse(localStorage.getItem(LSKey))
      setTodos(todos)
    } else {
      const todos = [
        {
          title: 'Complete online JavaScript course',
          checked: true,
          id: 'draggable-725010',
        },
        {
          title: 'Jog around the park 3x',
          checked: false,
          id: 'draggable-916603',
        },
        {
          title: '10 minutes meditation',
          checked: false,
          id: 'draggable-145757',
        },
        {
          title: 'Read for 1 hour',
          checked: false,
          id: 'draggable-221124',
        },
        {
          title: 'Pick up groceries',
          checked: false,
          id: 'draggable-440755',
        },
        {
          title: 'Complete Todo App on Frontend Mentor',
          checked: false,
          id: 'draggable-738189',
        },
      ]
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    // save todos in local storage
    localStorage.setItem(LSKey, JSON.stringify(todos))
  }, [todos])

  // rendering
  return (
    <TodoContext.Provider
      {...props}
      value={{
        todos,
        addTodo,
        removeTodo,
        toggleTodo,
        reorderTodo,
        clearCompleted,
        setTodos,
        filter,
        filterOptions,
        setFilter,
      }}
    />
  )
}

export const useTodoContext = () => useContext(TodoContext)
