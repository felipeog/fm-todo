import React from 'react'

import AppHeader from './components/AppHeader'
import TodoList from './components/TodoList'
import * as style from './App.module.scss'

const App = () => {
  return (
    <main className={`App ${style.root}`}>
      <div className={style.container}>
        <AppHeader />
        {/* <TodoInput /> */}
        <TodoList />
      </div>
    </main>
  )
}

export default App
