import React from 'react'

import Header from './components/Header'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import Actions from './components/Actions'
import { useTodoContext } from './contexts/TodoContext'
import * as style from './App.module.scss'

const App = () => {
  // contexts
  const { todos, filter } = useTodoContext()

  // rendering
  const isReorderDisabled = filter.value !== 'all'

  return (
    <main className={`App ${style.root}`}>
      <div className={style.container}>
        <Header />
        <TodoInput />
        <TodoList
          activeFilter={filter}
          isDragDisabled={isReorderDisabled}
          todos={todos}
        />
        <Actions />

        {!isReorderDisabled && (
          <p className={style.message}>Drag and drop to reorder list</p>
        )}
      </div>
    </main>
  )
}

export default App
