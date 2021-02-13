import React from 'react'

import { useTodoContext } from '../../contexts/TodoContext'
import * as style from './index.module.scss'

const Actions = ({}) => {
  // contexts
  const {
    todos,
    clearCompleted,
    filter,
    filterOptions,
    setFilter,
  } = useTodoContext()

  // rendering
  const renderActionList = (className) => (
    <ul className={className}>
      {filterOptions.map((filterOption) => (
        <li className={style.actionItem} key={filterOption.value}>
          <button
            className={`${style.actionButton} ${
              filter.value === filterOption.value ? style.active : ''
            }`}
            onClick={() => setFilter(filterOption)}
          >
            {filterOption.label}
          </button>
        </li>
      ))}
    </ul>
  )

  const itemsLeft = todos.filter(({ checked }) => !checked).length

  return (
    <footer className={`Actions ${style.root}`}>
      <div className={style.top}>
        <div className={style.itemsLeft}>
          {itemsLeft} item{itemsLeft !== 1 ? 's' : ''} left
        </div>

        {renderActionList(style.actionsListDesktop)}

        <button className={style.clearCompleted} onClick={clearCompleted}>
          Clear Completed
        </button>
      </div>

      <div className={style.bottom}>
        {renderActionList(style.actionsListMobile)}
      </div>
    </footer>
  )
}

export default Actions
