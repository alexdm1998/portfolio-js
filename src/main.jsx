import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './global.css'
import { NavigationProvider } from './hooks/NavigationContext.jsx'
import { ThemeContextProvider } from './hooks/ThemeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeContextProvider>
      <NavigationProvider>
        <App />
      </NavigationProvider>
    </ThemeContextProvider>
)
