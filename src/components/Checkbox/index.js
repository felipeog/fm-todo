import React from 'react'

import * as style from './index.module.scss'

const Checkbox = ({ isChecked, ...props }) => (
  <input
    className={`Checkbox ${style.root} ${isChecked ? style.checked : ''}`}
    type="checkbox"
    aria-checked={isChecked}
    aria-label="Todo check"
    {...props}
  />
)

export default Checkbox
