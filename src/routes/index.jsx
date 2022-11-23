import { useEffect } from 'react'
import { useGlobal } from '../contexts/GlobalContext'

import { CollabPage } from '../pages/collaboration'
import { HomePage } from '../pages/home'
import { JourneyPage, ProblemPage } from '../pages/journey'
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
  CreateJourneyPage,
  CreateProblemPage,
  ManageChallengePage,
  CreateChallengePage,
  DetailChallengePage,
  EditChallengePage
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
      if (pathname.includes('/admin/dashboard')) setTabs(1)
      else if (pathname.includes('/admin/manage/journeys')) setTabs(2)
      else if (pathname.includes('/admin/manage/challenges')) setTabs(3)

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

        <Route path="/learning-journey">
          <Route path='problems/:competeProblemId' element={<ProblemPage />} />
          <Route index element={<JourneyPage />} />
        </Route>

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
                <Route path="manage">
                  {/* Journeys */}
                  <Route path="journeys">
                    <Route path="create" element={<CreateJourneyPage />} />
                    <Route path=":journeyId" element={<DetailJourneyPage />} />
                    <Route path=":journeyId/edit" element={<EditJourneyPage />} />
                    <Route path=":journeyId/problems/create" element={<CreateProblemPage />} />
                    <Route path=":journeyId/problems/:problemId" element={<DetailProblemPage />} />
                    <Route path=":journeyId/problems/:problemId/edit" element={<EditProblemPage />} />
                    <Route path=":journeyId/problems/:problemId/samplecases/create" element={<CreateSampleCasePage />} />
                    <Route path=":journeyId/problems/:problemId/samplecases/:sampleId/edit" element={<EditSampleCasePage />} />
                    <Route path=":journeyId/problems/:problemId/testcases/create" element={<CreateTestCasePage />} />
                    <Route path=":journeyId/problems/:problemId/testcases/:testId/edit" element={<EditTestCasePage />} />
                    <Route index element={<ManageJourneyPage />} />
                  </Route>

                  {/* Challenges */}
                  <Route path="challenges">
                    <Route path="create" element={<CreateChallengePage />} />
                    <Route path=":competeId/problems/:challengeId" element={<DetailChallengePage />} />
                    <Route path=":competeId/problems/:challengeId/edit" element={<EditChallengePage />} />
                    <Route index element={<ManageChallengePage />} />
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Route>

              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="*" element={<NotFound />} />
              <Route index element={<NotFound />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
