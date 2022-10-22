import React from 'react'
import ReactDOM from 'react-dom/client'

import { AuthProvider } from './contexts/AuthContext'
import { GlobalProvider } from './contexts/GlobalContext'
import { CollabProvider } from './contexts/CollabContext'

import AppRoutes from './routes'

import './index.css'
import 'antd/dist/antd.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <GlobalProvider>
      <CollabProvider>
        <AppRoutes />
      </CollabProvider>
    </GlobalProvider>
  </AuthProvider>
)
