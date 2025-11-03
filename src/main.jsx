import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MyHostApp from './MyHostApp.jsx'

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <MyHostApp />
  </React.StrictMode>
)



