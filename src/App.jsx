import { AuthProvider } from './contexts/AuthContext'
import { GlobalProvider } from './contexts/GlobalContext'
import { Button } from 'antd'

const App = () => {
  return (
    <AuthProvider>
      <GlobalProvider>
        <div className="flex w-full items-center justify-center">
          <Button type="primary">Click Me</Button>
        </div>
      </GlobalProvider>
    </AuthProvider>
  )
}

export default App
