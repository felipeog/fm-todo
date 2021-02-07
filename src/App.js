import { h } from 'preact'

import AppHeader from './components/AppHeader'
import * as style from './App.module.scss'

const App = () => {
  return (
    <main className={`App ${style.root}`}>
      <AppHeader />
    </main>
  )
}

export default App
