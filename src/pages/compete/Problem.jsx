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
import Tour from 'reactour'

const CompeteProblemPage = () => {
  // useParams
  const { competeProblemId, competeId } = useParams()

  // Global States
  const { globalState, editorState, globalFunctions } = useGlobal()
  const { colHide, setIsOnlyEditor, isTourNeverShow, setIsTourNeverShow } = globalState
  const { mySwal } = globalFunctions
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
  const [localFirst, setLocalFirst] = useState(false)

  // Never show tour again
  const neverShowTour = () => {
    Cookies.set('isTourNeverShow', true)
    setIsTourNeverShow(true)

    // Close Swal
    mySwal.close()
  }

  // Swal footer
  const SwalFooter = () => {
    return (
      <a className='text-easy text-base font-semibold' onClick={() => neverShowTour()}>Jangan tampilkan lagi.</a>
    )
  }

  // Show mySwal
  const showTourSwal = () => {
    mySwal.fire({
      title: 'Ingin melihat tour LetsCode?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, saya ingin melihatnya',
      cancelButtonText: 'Tidak perlu',
      reverseButtons: true,
      footer: SwalFooter()
    }).then((result) => {
      if (result.isConfirmed) {
        setIsTourOpen(true)
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
      travelLog(`Visiting compete problem page ->${competeProblemId}`)
    }
  }, [user])

  // Open tour after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      setLocalFirst(true)
      !isTourNeverShow && showTourSwal()
    }, 2000)
  }, [])

  // Monitor isTourNeverShow
  useEffect(() => {
    if (localFirst) {
      !isTourNeverShow && showTourSwal()
    }
  }, [isTourNeverShow])

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

export default CompeteProblemPage
