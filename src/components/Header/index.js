import React, { useState } from 'react'

import Sun from 'url:../../assets/img/icon-sun.svg'
import Moon from 'url:../../assets/img/icon-moon.svg'
import * as style from './index.module.scss'

const Header = () => {
  // consts
  const themes = {
    dark: 'dark',
    light: 'light',
  }

  // state
  const [theme, setTheme] = useState(themes.dark)

  // functions
  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme =
        currentTheme === themes.dark ? themes.light : themes.dark

      document.querySelector('html').setAttribute('data-theme', nextTheme)

      return nextTheme
    })
  }

  // rendering
  return (
    <header className={`AppHeader ${style.root}`}>
      <h1 className={style.title}>Todo</h1>

      <button className={style.button} onClick={toggleTheme}>
        {theme === themes.dark ? (
          <img className={style.sunIcon} src={Sun} alt="Light theme" />
        ) : (
          <img className={style.moonIcon} src={Moon} alt="Dark theme" />
        )}
      </button>
    </header>
  )
}

export default Header
