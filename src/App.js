import React from 'react'

import Header from './components/Header'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import Actions from './components/Actions'
import * as style from './App.module.scss'

const App = () => (
  <main className={`App ${style.root}`}>
    <div className={style.container}>
      <Header />
      <TodoInput />
      <TodoList />
      <Actions />
    </div>
  </main>
)

export default App
