import { useState, useEffect } from 'react'
import { useGlobal } from '../../contexts/GlobalContext'
import { useAuth } from '../../contexts/AuthContext'
import { useCollab } from '../../contexts/CollabContext'
import { steps } from '../../constants/steps'

import api from '../../api'
import { Navbar as MainNavbar, Footer } from '../../layout'
import { Navbar, RoomInfo, SideContent } from '../../components/collaboration'
import Editor from '../../components/editor'
import Runner from '../../components/runner'
import Result from '../../components/result'

import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'
import { Modal } from 'antd'
import Tour from 'reactour'

const { confirm } = Modal

const ChallengeProblemPage = () => {
  // useParams
  const { competeProblemId, competeId } = useParams()

  // Global States
  const { globalState, editorState } = useGlobal()
  const { colHide, setIsOnlyEditor } = globalState
  const { run } = editorState

  // Auth States and Functions
  const { authStates, authFunctions } = useAuth()
  const { user } = authStates
  const { travelLog } = authFunctions

  // Collab States
  const { problemStates } = useCollab()
  const { setCompeteProblem, setCompeteMaxPoint, setLanguageList } = problemStates

  // Local States
  const [isTourOpen, setIsTourOpen] = useState(false)

  // Show Confirm Modal
  const showConfirm = () => {
    confirm({
      title: 'Apakah kamu ingin melihat cara kerja aplikasi ini?',
      okText: 'Ya, saya ingin melihatnya',
      okType: 'primary',
      cancelText: 'Tidak',
      onOk () {
        setIsTourOpen(true)
      },
      onCancel () {
        console.log('Cancel')
      }
    })
  }

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
      const { data } = await api.get(`/competes/${competeId}`, config)
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

  // Travel log
  useEffect(() => {
    if (user) {
      travelLog(`Visiting challenge problem page ->${competeProblemId}`)
    }
  }, [user])

  // Open tour after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      showConfirm()
    }, 2000)
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
      <Tour
        steps={steps}
        isOpen={isTourOpen}
        rounded={5}
        scrollSmooth
        scrollDuration={500}
        scrollOffset={-100}
        accentColor='#3B82F6'
        onRequestClose={() => setIsTourOpen(false)}
        badgeContent={(curr, tot) => `${curr} dari ${tot}`}
        padding={{
          mask: 14,
          popover: [5, 10],
          wrapper: 20
        }}
      />
    </div>
  )
}

export default ChallengeProblemPage
