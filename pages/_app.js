import '../styles/globals.css'
import 'antd/dist/antd.css'

import { ContextProvider } from '../contexts/ContextProvider'

function MyApp ({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  )
}

export default MyApp
