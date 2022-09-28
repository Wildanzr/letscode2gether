import { useGlobalContext } from './contexts/GlobalContext'
import { Navbar, RoomInfo, SideContent } from './components/collaboration'
import { Footer } from './components/footer'
import Editor from './components/editor'
import Runner from './components/runner'
import Result from './components/result'

const App = () => {
  // Global States
  const { globalState, editorState } = useGlobalContext()
  const { colHide } = globalState
  const { run } = editorState

  return (
    <main className="flex flex-col lg:flex-row w-full h-screen bg-[#4B5563] items-center lg:items-start justify-start">
      <Navbar />
      <SideContent />
      <div
        className={`flex flex-col ${
          colHide ? 'w-full lg:w-1/2 h-0 lg:h-full' : 'w-full h-full'
        } justify-between overflow-auto transition-all ease-in-out duration-500 space-y-6`}
      >
        <div className="flex flex-col w-full items-start justify-start py-2 px-2 space-y-6">
          <RoomInfo />
          <Editor />
          <Runner />
          {run && <Result />}
        </div>
          <Footer />
      </div>
    </main>
  )
}

export default App
