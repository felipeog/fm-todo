import React, { useState, useCallback } from 'react'

import Checkbox from '../Checkbox'
import * as style from './index.module.scss'

const TodoInput = ({ setTodos }) => {
  const [isChecked, setIsChecked] = useState(false)
  const [todoTitle, setTodoTitle] = useState('')

  const toggleIsChecked = () => setIsChecked((isChecked) => !isChecked)

  const handleTitleChange = (event) => setTodoTitle(event.target.value)

  const addTodo = useCallback(
    (event) => {
      event.preventDefault()

      setTodos((todos) => [
        ...todos,
        {
          title: todoTitle,
          checked: isChecked,
          id: `draggable-${Math.round(Math.random() * 999_999)}`,
        },
      ])
      setIsChecked(false)
      setTodoTitle('')
    },
    [isChecked, todoTitle],
  )

  return (
    <form className={`TodoInput ${style.root}`} onSubmit={addTodo}>
      <Checkbox isChecked={isChecked} onClick={toggleIsChecked} />
      <input
        className={style.input}
        type="text"
        value={todoTitle}
        onChange={handleTitleChange}
        placeholder="Create a new todo..."
      />
    </form>
  )
}

export default TodoInput
