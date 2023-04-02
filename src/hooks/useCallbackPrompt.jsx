import { useCallback, useEffect, useState } from 'react'

import { useGlobal } from '../contexts/GlobalContext'

import { useLocation, useNavigate } from 'react-router-dom'
import { useBlocker } from './useBlocker'

export function useCallbackPrompt (when) {
  // Global State
  const { globalState } = useGlobal()
  const { setTimeOut } = globalState

  // Local State
  const navigate = useNavigate()
  const location = useLocation()
  const [showPrompt, setShowPrompt] = useState(false)
  const [lastLocation, setLastLocation] = useState(null)
  const [confirmedNavigation, setConfirmedNavigation] = useState(false)

  const cancelNavigation = useCallback(() => {
    setShowPrompt(false)
    setLastLocation(null)
  }, [])

  const handleBlockedNavigation = useCallback((nextLocation) => {
    if (!confirmedNavigation && nextLocation.location.pathname !== location.pathname) {
      setShowPrompt(true)
      setLastLocation(nextLocation)
      return false
    }
    return true
  }, [confirmedNavigation, location])

  const confirmNavigation = useCallback(() => {
    setShowPrompt(false)
    setConfirmedNavigation(true)
    setTimeOut(false)
  }, [])

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      navigate(lastLocation.location.pathname)
      setConfirmedNavigation(false)
    }
  }, [confirmedNavigation, lastLocation])

  useBlocker(handleBlockedNavigation, when)

  return [showPrompt, cancelNavigation, confirmNavigation]
}
