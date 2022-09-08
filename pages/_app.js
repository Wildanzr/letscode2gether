import Script from 'next/script'

import '../styles/globals.css'
import 'antd/dist/antd.css'

import { ContextProvider } from '../contexts/ContextProvider'

function MyApp ({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Script
        src="https://meet.jit.si/external_api.js"
        strategy="beforeInteractive"
      />
      <Component {...pageProps} />
    </ContextProvider>
  )
}

export default MyApp
