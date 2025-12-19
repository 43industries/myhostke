import React from 'react'
import { createRoot } from 'react-dom/client'
import MyHostApp from './MyHostApp.jsx'
import './App.css'

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <MyHostApp />
  </React.StrictMode>
)



