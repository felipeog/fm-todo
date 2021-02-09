import React from 'react'

import * as style from './index.module.scss'

const Actions = ({
  itemsLeft,
  activeFilter,
  filterOptions,
  setFilter,
  clearCompleted,
}) => (
  <footer className={`Actions ${style.root}`}>
    <div className={style.itemsLeft}>{itemsLeft} items left</div>
    <ul className={style.actionsList}>
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
    <button className={style.clearCompleted} onClick={clearCompleted}>
      Clear Completed
    </button>
  </footer>
)

export default Actions
