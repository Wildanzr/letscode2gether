import { useGlobal } from '../contexts/GlobalContext'

import { CollabPage } from '../pages/collaboration'
import { HomePage } from '../pages/home'
import { JourneyPage } from '../pages/journey'
import { ChallengePage } from '../pages/challenge'
import { CompetePage } from '../pages/compete'
import { LeaderboardPage } from '../pages/leaderboard'
import { LoginPage, ForgotPage, RegisterPage, ResetPage, ActivatePage } from '../pages/auth'
import { DashboardPage } from '../pages/admin'
import { NotFound } from '../pages/notfound'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

const AppRoutes = () => {
  // Global States
  const { globalState } = useGlobal()
  const { isOn } = globalState

  if (isOn) {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  } else {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  }

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/learning-journey" element={<JourneyPage />} />
            <Route path="/challenges" element={<ChallengePage />} />
            <Route path="/competes" element={<CompetePage />} />
            <Route path="/leaderboards" element={<LeaderboardPage />} />
            <Route path="/collab" element={<CollabPage />} />

            <Route path='/auth'>
                <Route path="login" element={<LoginPage />} />
                <Route path="forgot" element={<ForgotPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="reset" element={<ResetPage />} />
                <Route path="activate" element={<ActivatePage />} />
                <Route path="*" element={<NotFound />} />
                <Route index element={<LoginPage />} />
            </Route>

            {/* Admin Route */}
            <Route path='/admin'>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="*" element={<NotFound />} />
                <Route index element={<NotFound />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
