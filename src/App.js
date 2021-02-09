import React, { useState, useEffect } from 'react'

import Header from './components/Header'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import Actions from './components/Actions'
import * as style from './App.module.scss'

const filterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
]
const defaultFilter = filterOptions[0]

const App = () => {
  const [todos, setTodos] = useState([])
  const [filteredTodos, setFilteredTodos] = useState(todos)
  const [filter, setFilter] = useState(defaultFilter)

  useEffect(() => {
    // check localstorage
  }, [])

  useEffect(() => {
    switch (filter.value) {
      case 'all':
        setFilteredTodos(todos)
        break

      case 'active':
        setFilteredTodos(todos.filter(({ checked }) => !checked))
        break

      case 'completed':
        setFilteredTodos(todos.filter(({ checked }) => checked))
        break

      default:
        throw new Error('App @ useEffect >>>>> Invalid filter value')
    }
  }, [filter, todos])

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
          filteredTodos={filteredTodos}
          setTodos={setTodos}
          isDragDisabled={isReorderDisabled}
        />
        <Actions
          itemsLeft={itemsLeft}
          activeFilter={filter}
          filterOptions={filterOptions}
          setFilter={setFilter}
          clearCompleted={clearCompleted}
        />

        {!isReorderDisabled && (
          <p className={style.message}>Drag and drop to reorder list</p>
        )}
      </div>
    </main>
  )
}

export default App
