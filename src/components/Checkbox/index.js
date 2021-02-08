import React from 'react'

import * as style from './index.module.scss'

const Checkbox = ({ isChecked, ...props }) => (
  <input
    className={`Checkbox ${style.root}`}
    type="checkbox"
    checked={isChecked}
    {...props}
  />
)

export default Checkbox
