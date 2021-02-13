import React from 'react'
import { render } from 'react-dom'

import { TodoProvider } from './contexts/TodoContext'
import App from './App'
import './index.scss'

render(
  <TodoProvider>
    <App />
  </TodoProvider>,
  document.getElementById('root'),
)
