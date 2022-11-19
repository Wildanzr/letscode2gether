import { useGlobal } from '../../contexts/GlobalContext'

import { Navbar as MainNavbar, Footer } from '../../layout'
import { RoomInfo } from '../../components/collaboration'
import Editor from '../../components/editor'
import Runner from '../../components/runner'
import Result from '../../components/result'

const CollabPage = () => {
  // Global States
  const { globalState, editorState } = useGlobal()
  const { colHide } = globalState
  const { run } = editorState

  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <MainNavbar>
        <main className="flex flex-col lg:flex-row w-full h-full items-center lg:items-start justify-start bg-milk dark:bg-alternate duration-300 ease-in-out">
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

export default CollabPage
