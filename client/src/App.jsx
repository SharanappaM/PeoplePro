import React from 'react'
import "./App.css"
import LoginPage from './components/pages/loginpage/LoginPage'
import Dashboard from './components/layouts/Dashboard'
import Routers from './components/routers/Routers'
import { ThemeProvider } from '@emotion/react'
import theme from './components/theme/theme'
import { Provider } from 'react-redux'
import { store } from './components/redux/store'

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Routers />

        </ThemeProvider>

      </Provider>


    </div>
  )
}

export default App
