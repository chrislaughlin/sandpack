import React from 'react'
import ReactDOM from 'react-dom'
import "@codesandbox/sandpack-react/dist/index.css";
import { SandpackProvider } from '@codesandbox/sandpack-react'

import './index.css'
import App from './App'


ReactDOM.render(
  <React.StrictMode>
    <SandpackProvider>
      <App />
    </SandpackProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
