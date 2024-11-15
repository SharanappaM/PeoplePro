import React from 'react'
import "./App.css"
import LoginPage from './components/pages/loginpage/LoginPage'
import Dashboard from './components/layouts/Dashboard'
import Routers from './components/routers/Routers'
import { ThemeProvider } from '@emotion/react'
import theme from './components/theme/theme'

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Routers />

      </ThemeProvider>

    </div>
  )
}

export default App
