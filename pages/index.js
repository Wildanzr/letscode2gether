import Head from 'next/head'

import { useStateContext } from '../contexts/ContextProvider'

const Home = () => {
  // Get global state from ContextProvider
  const { states, authStates } = useStateContext()

  console.log(states)
  console.log(authStates)

  return (
    <div>
      <Head>
      </Head>

      <main>
        <p className='text-5xl font-bold text-center'>Hello men</p>
      </main>
    </div>
  )
}
export default Home
