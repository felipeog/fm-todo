import React, { useState } from 'react'

import Header from './components/Header'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import * as style from './App.module.scss'

const initialTodos = [
  {
    title: 'title 0',
    id: 'todo-0',
    checked: false,
  },
  {
    title: 'title 1',
    id: 'todo-1',
    checked: false,
  },
]

const App = () => {
  const [todos, setTodos] = useState(initialTodos)

  return (
    <main className={`App ${style.root}`}>
      <div className={style.container}>
        <Header />
        <TodoInput setTodos={setTodos} />
        <TodoList todos={todos} setTodos={setTodos} />
        {/* <Actions /> */}
      </div>
    </main>
  )
}

export default App
