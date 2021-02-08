import React from 'react'
import { useState } from 'preact/hooks'

import Sun from 'url:../../assets/img/icon-sun.svg'
import Moon from 'url:../../assets/img/icon-moon.svg'
import * as style from './index.module.scss'

const themes = {
  dark: 'dark',
  light: 'light',
}

const Header = () => {
  const [theme, setTheme] = useState(themes.dark)

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme =
        currentTheme === themes.dark ? themes.light : themes.dark

      document.querySelector('html').setAttribute('data-theme', nextTheme)

      return nextTheme
    })
  }

  return (
    <header className={`AppHeader ${style.root}`}>
      <h1 className={style.title}>Todo</h1>

      <button className={style.button} onClick={toggleTheme}>
        {theme === themes.dark ? <img src={Sun} /> : <img src={Moon} />}
      </button>
    </header>
  )
}

export default Header
