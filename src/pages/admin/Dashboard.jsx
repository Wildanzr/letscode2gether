import { useState } from 'react'

import { Navbar, Footer } from '../../layout'
import { Statistics } from '../../views'
import { PopularCompete, PopularProblem } from '../../components/table'

const DashboardPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [competes, setCompetes] = useState([
    {
      name: 'Live Coding - PEMDAS 2022',
      participants: 135
    },
    {
      name: 'Hack The Box',
      participants: 120
    },
    {
      name: 'Latihan Soal - UTP 2022',
      participants: 96
    },
    {
      name: 'Live Coding - ASD 2022',
      participants: 86
    },
    {
      name: 'Live Coding - PBO 2022',
      participants: 74
    }
  ])
  // eslint-disable-next-line no-unused-vars
  const [problems, setProblems] = useState([
    {
      name: 'Match The Pattern',
      submissions: 390,
      rate: 0.344
    },
    {
      name: 'The Greatest Common Divisor',
      submissions: 385,
      rate: 0.675
    },
    {
      name: 'Wave Sort',
      submissions: 361,
      rate: 0.313
    }
  ])
  return (
    <div className='flex flex-col items-center justify-between w-full min-h-screen space-y-14 bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out'>
      <Navbar />
      <div className="flex flex-col w-11/12 space-y-6">
        <Statistics />

        <div className="flex flex-col space-y-4">
          <h3 className='mb-0 font-ubuntu text-main dark:text-snow text-xl font-medium duration-300 ease-in-out'>Popular Competes</h3>
          <div className="flex flex-col py-4 overflow-y-auto">
            <div className="flex w-full">
              <PopularCompete competes={competes} />
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <h3 className='mb-0 font-ubuntu text-main dark:text-snow text-xl font-medium duration-300 ease-in-out'>Popular Competes</h3>
          <div className="flex flex-col py-4 overflow-y-auto">
            <div className="flex w-full">
              <PopularProblem problems={problems} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default DashboardPage
