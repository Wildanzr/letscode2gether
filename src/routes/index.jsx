import { useEffect } from 'react'
import { useGlobal } from '../contexts/GlobalContext'

import { CollabPage } from '../pages/collaboration'
import { HomePage } from '../pages/home'
import { JourneyPage } from '../pages/journey'
import { ChallengePage } from '../pages/challenge'
import { CompetePage } from '../pages/compete'
import { LeaderboardPage } from '../pages/leaderboard'
import { LoginPage, ForgotPage, RegisterPage, ResetPage, ActivatePage } from '../pages/auth'
import {
  DashboardPage,
  ManageJourneyPage,
  DetailJourneyPage,
  DetailProblemPage,
  EditJourneyPage,
  EditProblemPage,
  CreateSampleCasePage,
  CreateTestCasePage,
  EditSampleCasePage,
  EditTestCasePage,
  CreateJourneyPage
} from '../pages/admin'
import { NotFound } from '../pages/notfound'

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

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
      <RouteList />
    </BrowserRouter>
  )
}

const RouteList = () => {
  // Global States
  const { globalState } = useGlobal()
  const { setTabs } = globalState

  // useLocation
  const { pathname } = useLocation()

  // Monitor pathname
  useEffect(() => {
    const defineLocation = () => {
      // For Admin
      if (pathname.includes('/dashboard')) setTabs(1)
      else if (pathname.includes('/manage/journeys')) setTabs(2)
      else if (pathname.includes('/manage/problems')) setTabs(3)

      // For User
      else if (pathname.includes('/learning-journey')) setTabs(1)
      else if (pathname.includes('/challenges')) setTabs(2)
      else if (pathname.includes('/competes')) setTabs(3)
      else if (pathname.includes('/leaderboards')) setTabs(4)
    }
    defineLocation()
  }, [pathname])
  return (
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
                <Route path="manage/journeys" element={<ManageJourneyPage />} />
                <Route path="manage/journeys/:journeyId" element={<DetailJourneyPage />} />
                <Route path="manage/journeys/create" element={<CreateJourneyPage />} />
                <Route path="manage/journeys/:journeyId/edit" element={<EditJourneyPage />} />
                <Route path="manage/journeys/:journeyId/problems/:problemId" element={<DetailProblemPage />} />
                <Route path="manage/journeys/:journeyId/problems/:problemId/edit" element={<EditProblemPage />} />
                <Route path="manage/journeys/:journeyId/problems/:problemId/samplecases/create" element={<CreateSampleCasePage />} />
                <Route path="manage/journeys/:journeyId/problems/:problemId/samplecases/:sampleId/edit" element={<EditSampleCasePage />} />
                <Route path="manage/journeys/:journeyId/problems/:problemId/testcases/create" element={<CreateTestCasePage />} />
                <Route path="manage/journeys/:journeyId/problems/:problemId/testcases/:testId/edit" element={<EditTestCasePage />} />
                <Route path="*" element={<NotFound />} />
                <Route index element={<NotFound />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
