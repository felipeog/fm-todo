import React from 'react'

import { useTodoContext } from '../../contexts/TodoContext'
import * as style from './index.module.scss'

const Actions = () => {
  // contexts
  const {
    todos,
    clearCompleted,
    filter,
    filterOptions,
    setFilter,
    isReorderDisabled,
    itemsLeft,
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

      {!isReorderDisabled && (
        <p className={style.message}>Drag and drop to reorder list</p>
      )}
    </footer>
  )
}

export default Actions
