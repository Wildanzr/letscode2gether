import Leaderboard from '../../assets/leaderboard.svg'

import { Leaderboard as LeaderboardTable } from '../../components/table'

import { Navbar, Footer } from '../../layout'

const LeaderboardPage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen justify-between space-y-14 bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <Navbar />

      {/* Header */}
      <div className="flex px-[5%] flex-col lg:flex-row-reverse w-full items-center justify-center lg:justify-between">
        <div className="flex w-full lg:w-1/3 items-center justify-center">
          <img src={Leaderboard} className="flex w-[60%]" />
        </div>

        <div className="flex w-full lg:w-2/3 items-center justify-center">
          <div className="flex flex-col w-full space-y-4 lg:space-y-8 items-center lg:items-start">
            <p className="text-3xl text-center lg:text-left mb-0 lg:text-5xl font-ubuntu font-medium">
              Leaderboard
            </p>
            <p className="flex lg:hidden font-ubuntu text-base lg:text-lg text-center lg:text-left">
              Here you can see top coder from letscode. Want to see your name listed in this leaderboard?
              We believe you can achieve that, prove to the world that you can do it!
            </p>
            <p className="hidden lg:flex font-ubuntu text-base lg:text-lg text-center lg:text-left">
              Here you can see top coder from letscode. Want to see your name listed in this leaderboard?
              We believe you can achieve that, prove to the world that you can do it!
            </p>
          </div>
        </div>

      </div>

      {/* Leaderboard Table */}
      <div className="flex px-[5%] flex-col lg:flex-row-reverse w-full items-center justify-center lg:justify-between">
        <LeaderboardTable />
      </div>

      <Footer />
    </div>
  )
}

export default LeaderboardPage
