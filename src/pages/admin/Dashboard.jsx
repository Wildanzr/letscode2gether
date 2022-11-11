import { Navbar, Footer } from '../../layout'

import { Statistics } from '../../views'

const DashboardPage = () => {
  return (
    <div className='flex flex-col items-center justify-between w-full min-h-screen space-y-14 bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out'>
      <Navbar />
      <div className="flex flex-col w-11/12">
        <Statistics />
      </div>
      <Footer />
    </div>
  )
}

export default DashboardPage
