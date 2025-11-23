import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import App from './App'
import { StoreProvider } from './stores/StoreContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FluentProvider theme={webLightTheme}>
      <BrowserRouter>
        <StoreProvider>
          <App />
        </StoreProvider>
      </BrowserRouter>
    </FluentProvider>
  </React.StrictMode>,
)
