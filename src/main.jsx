import React from 'react'
import ReactDOM from 'react-dom/client'

import { AuthProvider } from './contexts/AuthContext'
import { GlobalProvider } from './contexts/GlobalContext'
import { CollabProvider } from './contexts/CollabContext'

import App from './App'
import './index.css'

import 'antd/dist/antd.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <GlobalProvider>
        <CollabProvider>
          <App />
        </CollabProvider>
      </GlobalProvider>
    </AuthProvider>
  </React.StrictMode>
)
