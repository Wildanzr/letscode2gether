import { AuthProvider } from './contexts/AuthContext'
import { GlobalProvider } from './contexts/GlobalContext'

import { Navbar, RoomInfo } from './components/collaboration'
import Editor from './components/editor'
import Runner from './components/runner'
import Result from './components/result'

const App = () => {
  return (
    <AuthProvider>
      <GlobalProvider>
      <main className="flex flex-col lg:flex-row w-full h-screen bg-[#4B5563] items-center lg:items-start justify-start">
        <Navbar />

        <div className="flex flex-col w-full h-full overflow-auto">
          <div className="flex flex-col w-full items-start justify-start py-2 px-2 gap-6">
            <RoomInfo />
            <Editor />
            <Runner />
            <Result />
          </div>
        </div>
      </main>
      </GlobalProvider>
    </AuthProvider>
  )
}

export default App
