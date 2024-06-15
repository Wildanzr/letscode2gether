import { useEffect } from 'react'
import { useGlobal } from '../contexts/GlobalContext'
import { useCollab } from '../contexts/CollabContext'

import { CollabPage } from '../pages/collaboration'
import { HomePage } from '../pages/home'
import { JourneyPage, ProblemPage } from '../pages/journey'
import { ChallengePage, ChallengeProblemPage } from '../pages/challenge'
import {
  CompetePage,
  CompeteLobbyPage,
  CompeteProblemPage
} from '../pages/compete'
import { LeaderboardPage } from '../pages/leaderboard'
import { ProfilePage, SettingPage } from '../pages/user'
import {
  LoginPage,
  ForgotPage,
  RegisterPage,
  ResetPage,
  ActivatePage,
  TeacherRegisterPage
} from '../pages/auth'
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
import {
  CreateCompetesPage,
  ManageCompetesPage,
  DetailCompetesPage,
  EditCompetesPage,
  CreateCompeteProblemPage,
  DetailCompeteProblemPage,
  EditCompeteProblemPage,
  CreateProblemSampleCasePage,
  EditProblemSampleCasePage,
  CreateProblemTestCasePage,
  EditProblemTestCasePage
} from '../pages/teacher'
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
  const { globalState, editorState } = useGlobal()
  const { setTabs } = globalState
  const { setRun } = editorState

  // Collab States
  const { collabStates } = useCollab()
  const { setCode, setLanguage } = collabStates

  // useLocation
  const { pathname } = useLocation()

  // Define location
  const defineLocation = () => {
    // For Admin
    if (pathname.includes('/admin/dashboard')) setTabs(1)
    else if (pathname.includes('/admin/manage/journeys')) setTabs(2)
    else if (pathname.includes('/admin/manage/challenges')) setTabs(3)
    // For Teacher
    else if (pathname.includes('/teacher/dashboard')) setTabs(1)
    else if (pathname.includes('/teacher/manage/competes')) setTabs(2)
    // For User
    else if (pathname.includes('/learning-journey')) setTabs(1)
    else if (pathname.includes('/challenges')) setTabs(2)
    else if (pathname.includes('/competes')) setTabs(3)
    else if (pathname.includes('/leaderboards')) setTabs(4)
  }

  // Reset collaboration
  const resetCollab = () => {
    setCode('')
    setLanguage(null)
    setRun(false)
  }

  // Monitor pathname
  useEffect(() => {
    defineLocation()
    resetCollab()
  }, [pathname])
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* Profile */}
      <Route path="/profile/:username" element={<ProfilePage />} />

      {/* Setting */}
      <Route path="/settings" element={<SettingPage />} />

      {/* Materials */}
      <Route path="/materials">
        <Route
          path="path/:materialId"
          element={<ProblemPage />}
        />
        <Route index element={<JourneyPage />} />
      </Route>

      {/* Learning Journey */}
      <Route path="/learning-journey">
        <Route
          path="path/:competeId/problems/:competeProblemId"
          element={<ProblemPage />}
        />
        <Route index element={<JourneyPage />} />
      </Route>

      {/* Challenge */}
      <Route path="/challenges">
        <Route
          path="path/:competeId/problems/:competeProblemId"
          element={<ChallengeProblemPage />}
        />
        <Route index element={<ChallengePage />} />
      </Route>

      {/* Compete */}
      <Route path="/competes">
        <Route path=":competeId/lobby">
          <Route
            path="path/:competeId/problems/:competeProblemId"
            element={<CompeteProblemPage />}
          />
          <Route index element={<CompeteLobbyPage />} />
        </Route>
        <Route index element={<CompetePage />} />
      </Route>

      <Route path="/leaderboards" element={<LeaderboardPage />} />
      <Route path="/collab" element={<CollabPage />} />

      {/* Auth */}
      <Route path="/auth">
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot" element={<ForgotPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="teacher/register" element={<TeacherRegisterPage />} />
        <Route path="reset" element={<ResetPage />} />
        <Route path="activate" element={<ActivatePage />} />
        <Route path="*" element={<NotFound />} />
        <Route index element={<LoginPage />} />
      </Route>

      {/* Admin Route */}
      <Route path="/admin">
        <Route path="manage">
          {/* Journeys */}
          <Route path="journeys">
            <Route path="create" element={<CreateJourneyPage />} />
            <Route path=":journeyId" element={<DetailJourneyPage />} />
            <Route path=":journeyId/edit" element={<EditJourneyPage />} />
            <Route
              path=":journeyId/problems/create"
              element={<CreateProblemPage />}
            />
            <Route
              path=":journeyId/problems/:problemId"
              element={<DetailProblemPage />}
            />
            <Route
              path=":journeyId/problems/:problemId/edit"
              element={<EditProblemPage />}
            />
            <Route
              path=":journeyId/problems/:problemId/samplecases/create"
              element={<CreateSampleCasePage />}
            />
            <Route
              path=":journeyId/problems/:problemId/samplecases/:sampleId/edit"
              element={<EditSampleCasePage />}
            />
            <Route
              path=":journeyId/problems/:problemId/testcases/create"
              element={<CreateTestCasePage />}
            />
            <Route
              path=":journeyId/problems/:problemId/testcases/:testId/edit"
              element={<EditTestCasePage />}
            />
            <Route index element={<ManageJourneyPage />} />
          </Route>

          {/* Challenges */}
          <Route path="challenges">
            <Route path="create" element={<CreateChallengePage />} />
            <Route
              path=":competeId/problems/:challengeId"
              element={<DetailChallengePage />}
            />
            <Route
              path=":competeId/problems/:challengeId/edit"
              element={<EditChallengePage />}
            />
            <Route
              path=":competeId/problems/:challengeId/samplecases/create"
              element={<CreateSampleCasePage />}
            />
            <Route
              path=":competeId/problems/:challengeId/samplecases/:sampleId/edit"
              element={<EditSampleCasePage />}
            />
            <Route
              path=":competeId/problems/:challengeId/testcases/create"
              element={<CreateTestCasePage />}
            />
            <Route
              path=":competeId/problems/:challengeId/testcases/:testId/edit"
              element={<EditTestCasePage />}
            />
            <Route index element={<ManageChallengePage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFound />} />
        <Route index element={<NotFound />} />
      </Route>

      {/* Teacher Route */}
      <Route path="/teacher">
        <Route path="manage">
          {/* Competes */}
          <Route path="competes">
            <Route path="create" element={<CreateCompetesPage />} />
            <Route path=":journeyId" element={<DetailCompetesPage />} />
            <Route path=":journeyId/edit" element={<EditCompetesPage />} />
            <Route
              path=":journeyId/problems/create"
              element={<CreateCompeteProblemPage />}
            />
            <Route
              path=":journeyId/problems/:problemId"
              element={<DetailCompeteProblemPage />}
            />
            <Route
              path=":journeyId/problems/:problemId/edit"
              element={<EditCompeteProblemPage />}
            />
            <Route
              path=":journeyId/problems/:problemId/samplecases/create"
              element={<CreateProblemSampleCasePage />}
            />
            <Route
              path=":journeyId/problems/:problemId/samplecases/:sampleId/edit"
              element={<EditProblemSampleCasePage />}
            />
            <Route
              path=":journeyId/problems/:problemId/testcases/create"
              element={<CreateProblemTestCasePage />}
            />
            <Route
              path=":journeyId/problems/:problemId/testcases/:testId/edit"
              element={<EditProblemTestCasePage />}
            />
            <Route index element={<ManageCompetesPage />} />
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
