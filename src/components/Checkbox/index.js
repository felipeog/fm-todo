import React from 'react'

import * as style from './index.module.scss'

const Checkbox = ({ isChecked, ...props }) => (
  <input
    className={`Checkbox ${style.root} ${isChecked ? style.checked : ''}`}
    type="checkbox"
    {...props}
  />
)

export default Checkbox
