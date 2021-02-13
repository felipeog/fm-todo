import React, { useState } from 'react'

import Checkbox from '../Checkbox'
import { useTodoContext } from '../../contexts/TodoContext'
import * as style from './index.module.scss'

const TodoInput = () => {
  // contexts
  const { addTodo } = useTodoContext()

  // state
  const [isChecked, setIsChecked] = useState(false)
  const [todoTitle, setTodoTitle] = useState('')

  // functions
  const toggleIsChecked = () => {
    setIsChecked((isChecked) => !isChecked)
  }
  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value)
  }
  const handleTodoSubmit = (event) => {
    event.preventDefault()

    addTodo({ title: todoTitle, checked: isChecked })
    setIsChecked(false)
    setTodoTitle('')
  }

  // rendering
  return (
    <form className={`TodoInput ${style.root}`} onSubmit={handleTodoSubmit}>
      <Checkbox isChecked={isChecked} onClick={toggleIsChecked} />
      <input
        className={style.input}
        type="text"
        value={todoTitle}
        onChange={handleTitleChange}
        placeholder="Create a new todo..."
        aria-label="Todo input"
      />
      <input style={{ display: 'none' }} type="submit" value="Add todo" />
    </form>
  )
}

export default TodoInput
