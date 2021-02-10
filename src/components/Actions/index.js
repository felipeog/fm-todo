import React from 'react'

import * as style from './index.module.scss'

const Actions = ({
  activeFilter,
  clearCompleted,
  filterOptions,
  itemsLeft,
  setFilter,
}) => {
  const renderActionList = (className) => (
    <ul className={className}>
      {filterOptions.map((filter) => (
        <li className={style.actionItem} key={filter.value}>
          <button
            className={`${style.actionButton} ${
              activeFilter.value === filter.value ? style.active : ''
            }`}
            onClick={() => setFilter(filter)}
          >
            {filter.label}
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
    </footer>
  )
}

export default Actions
