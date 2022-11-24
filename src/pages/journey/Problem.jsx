import { useEffect } from 'react'
import { useGlobal } from '../../contexts/GlobalContext'
import { useCollab } from '../../contexts/CollabContext'

import api from '../../api'
import { Navbar as MainNavbar, Footer } from '../../layout'
import { Navbar, RoomInfo, SideContent } from '../../components/collaboration'
import Editor from '../../components/editor'
import Runner from '../../components/runner'
import Result from '../../components/result'

import Cookies from 'js-cookie'
import { useParams, useSearchParams } from 'react-router-dom'

const ProblemPage = () => {
  // useParams
  const { competeProblemId } = useParams()

  // useSearchParams
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')

  // Global States
  const { globalState, editorState } = useGlobal()
  const { colHide, setIsOnlyEditor } = globalState
  const { run } = editorState

  // Collab States
  const { problemStates } = useCollab()
  const { setCompeteProblem, setCompeteMaxPoint, setLanguageList } = problemStates

  // Get compete problem detail
  const getCompeteProblemDetail = async () => {
    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    try {
      const { data } = await api.get(`/competes/cp/${competeProblemId}`, config)
      // console.log(data)

      const { competeProblem } = data.data
      const { problemId, maxPoint } = competeProblem
      setCompeteProblem(problemId)
      setCompeteMaxPoint(maxPoint)
    } catch (error) {
      console.log(error)
    }
  }

  // Get compete allowed language
  const getCompeteAllowedLanguage = async () => {
    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    try {
      const { data } = await api.get(`/competes/${from}`, config)
      // console.log(data)

      // Set language list
      const { languageAllowed } = data.data.compete
      setLanguageList(languageAllowed)
    } catch (error) {
      console.log(error)
    }
  }

  // Initially get compete problem detail
  useEffect(() => {
    setIsOnlyEditor(false)
    getCompeteAllowedLanguage()
    getCompeteProblemDetail()
  }, [])

  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <MainNavbar>
        <main className="flex flex-col lg:flex-row w-full h-full items-center lg:items-start justify-start bg-milk dark:bg-alternate duration-300 ease-in-out">
          <Navbar />
          <SideContent />
          <div
            className={`flex flex-col ${
              colHide ? 'w-full lg:w-1/2 h-0 lg:h-full' : 'w-full h-full'
            } justify-between overflow-auto transition-all ease-in-out duration-500 space-y-6`}
          >
            <div className="flex flex-col w-full h-full items-start justify-start pt-2 pb-10 px-2 space-y-6 bg-milk dark:bg-alternate duration-300 ease-in-out">
              <RoomInfo />
              <Editor />
              <Runner />
              {run && <Result />}
            </div>
          </div>
        </main>
      </MainNavbar>
      <Footer />
    </div>
  )
}

export default ProblemPage
