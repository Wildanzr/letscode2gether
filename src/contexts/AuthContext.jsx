import { createContext, useContext, useState, useEffect } from 'react'

import api from '../api'

import Cookies from 'js-cookie'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [jwtToken, setJwtToken] = useState(Cookies.get('jwtToken'))
  const [isAuthenticated, setIsAuthenticated] = useState(!!jwtToken)
  const [user, setUser] = useState(null)

  // fetch user data
  const fetchUser = async () => {
    // Set header authorization
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }
    await api.get('/auth/me', config).then((res) => {
      // console.log(res.data)
      setUser(res.data.data.user)
    })
  }

  // TravelLog
  const travelLog = async (path = '', from = '', to = '') => {
    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      await api.post(`user/travel?path=${path}&from=${from}&to=${to}&mode=1`, {}, config)
    } catch (error) {
      console.log(error)
    }
  }

  // Fetch user data when jwtToken changed
  useEffect(() => {
    if (jwtToken) {
      fetchUser(jwtToken)
    }
  }, [jwtToken])

  // Export auth state
  const authStates = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    jwtToken,
    setJwtToken
  }

  // Export auth functions here
  const authFunctions = {
    fetchUser,
    travelLog
  }

  return (
    <AuthContext.Provider value={{ authStates, authFunctions }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
