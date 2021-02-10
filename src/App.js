import React, { useState, useEffect } from 'react'

import Header from './components/Header'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import Actions from './components/Actions'
import * as style from './App.module.scss'

const LSKey = 'fm-todo/items'
const filterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
]
const defaultFilter = filterOptions[0]

const App = () => {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState(defaultFilter)

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

  const clearCompleted = () => {
    setTodos((todos) => todos.filter(({ checked }) => !checked))
  }

  const itemsLeft = todos.filter(({ checked }) => !checked).length
  const isReorderDisabled = filter.value !== 'all'

  return (
    <main className={`App ${style.root}`}>
      <div className={style.container}>
        <Header />
        <TodoInput setTodos={setTodos} />
        <TodoList
          activeFilter={filter}
          isDragDisabled={isReorderDisabled}
          setTodos={setTodos}
          todos={todos}
        />
        <Actions
          activeFilter={filter}
          clearCompleted={clearCompleted}
          filterOptions={filterOptions}
          itemsLeft={itemsLeft}
          setFilter={setFilter}
        />

        {!isReorderDisabled && (
          <p className={style.message}>Drag and drop to reorder list</p>
        )}
      </div>
    </main>
  )
}

export default App
