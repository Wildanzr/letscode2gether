import { useGlobal } from '../../contexts/GlobalContext'

import { Navbar as MainNavbar, Footer } from '../../layout'
import { Navbar, RoomInfo, SideContent } from '../../components/collaboration'
import Editor from '../../components/editor'
import Runner from '../../components/runner'
import Result from '../../components/result'

const ProblemPage = () => {
  // Global States
  const { globalState, editorState } = useGlobal()
  const { colHide } = globalState
  const { run } = editorState

  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <MainNavbar>
        <main className="flex flex-col lg:flex-row w-full h-full bg-alternate items-center lg:items-start justify-start">
          <Navbar />
          <SideContent />
          <div
            className={`flex flex-col ${
              colHide ? 'w-full lg:w-1/2 h-0 lg:h-full' : 'w-full h-full'
            } justify-between overflow-auto transition-all ease-in-out duration-500 space-y-6`}
          >
            <div className="flex flex-col w-full h-full bg-floor items-start justify-start py-2 px-2 space-y-6">
              <RoomInfo />
              <Editor />
              <Runner />
              {run && <Result />}
            </div>
          </div>
        </main>
      <Footer />
      </MainNavbar>
    </div>
  )
}

export default ProblemPage
