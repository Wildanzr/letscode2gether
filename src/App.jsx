import { Navbar, RoomInfo, SideContent } from './components/collaboration'
import Editor from './components/editor'
import Runner from './components/runner'
import Result from './components/result'

import { useGlobalContext } from './contexts/GlobalContext'

const App = () => {
  const { globalState } = useGlobalContext()

  const { colHide } = globalState

  return (
    <main className="flex flex-col lg:flex-row w-full h-screen bg-[#4B5563] items-center lg:items-start justify-start">
      <Navbar />
      <SideContent />
      <div
        className={`flex flex-col ${
          colHide ? 'w-full lg:w-1/2 h-0 lg:h-full' : 'w-full h-full'
        } overflow-auto transition-all ease-in-out duration-500`}
      >
        <div className="flex flex-col w-full items-start justify-start py-2 px-2 space-y-4">
          <RoomInfo />
          <Editor />
          <Runner />
          <Result />
        </div>
      </div>
    </main>
  )
}

export default App
