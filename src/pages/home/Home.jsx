import Learn from '../../assets/learn.svg'
import Collaborate from '../../assets/collaborate.svg'
import Compile from '../../assets/compile.svg'

import { Navbar, Footer } from '../../layout'

import { RiArrowRightSLine } from 'react-icons/ri'

const HomePage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen space-y-14 bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <Navbar />

      {/* Info 1 */}
      <div className="flex px-5 flex-col lg:flex-row w-full items-center justify-center lg:justify-between">
        <div className="flex w-full lg:w-1/2 items-center justify-center">
          <img src={Learn} className="flex w-[60%]" />
        </div>

        <div className="flex w-full lg:w-1/2 items-center justify-center">
          <div className="flex flex-col w-full space-y-4 lg:space-y-8 items-center">
            <p className='text-3xl text-center mb-0 lg:text-5xl font-ubuntu font-medium'>
              A new way to learn
            </p>
            <p className='flex lg:hidden font-ubuntu text-base lg:text-lg text-center'>
              LetsCode is the best platform to help you learn programming, improve problem solving and collaborative skills.
            </p>
            <p className='hidden lg:flex font-ubuntu text-base lg:text-lg text-center'>
              LetsCode is the best platform to help you learn programming, <br /> improve problem solving and collaborative skills.
            </p>
            <button className='flex flex-row items-center space-x-4 px-10 py-3 rounded-full font-ubuntu font-medium text-lg bg-easy'>
              Get Started <RiArrowRightSLine className='w-6 h-6' />
            </button>
          </div>
        </div>
      </div>

      {/* Info 2 */}
      <div className="flex px-5 flex-col lg:flex-row-reverse w-full items-center justify-center lg:justify-around">
        <div className="flex w-full lg:w-1/2 items-center justify-center">
          <img src={Collaborate} className="flex w-[60%]" />
        </div>

        <div className="flex w-full lg:w-1/2 items-center justify-center">
          <div className="flex flex-col w-full space-y-4 lg:space-y-8 items-center">
            <p className='text-3xl text-center mb-0 lg:text-5xl font-ubuntu font-medium'>
              Together more easier
            </p>
            <p className='flex lg:hidden font-ubuntu text-base lg:text-lg text-center'>
              Don&apos;t think too hard! Invite your friends to solve problems together. We provide a text editor platform that can be used to collaborate anywhere and anytime.
            </p>
            <p className='hidden lg:flex font-ubuntu text-base lg:text-lg text-center'>
              Don&apos;t think too hard! Invite your friends to solve problems together. <br /> We provide a text editor platform that can be used to <br /> collaborate anywhere and anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Info 3 */}
      <div className="flex px-5 flex-col lg:flex-row w-full items-center justify-center lg:justify-between">
        <div className="flex w-full lg:w-1/2 items-center justify-center">
          <img src={Compile} className="flex w-[60%]" />
        </div>

        <div className="flex w-full lg:w-1/2 items-center justify-center">
          <div className="flex flex-col w-full space-y-4 lg:space-y-8 items-center">
            <p className='text-3xl text-center mb-0 lg:text-5xl font-ubuntu font-medium'>
              Simply compile and run
            </p>
            <p className='flex lg:hidden font-ubuntu text-base lg:text-lg text-center'>
              No need to install and configure programming languages on your device. Just choose a programming language and write a few lines of code.
            </p>
            <p className='hidden lg:flex font-ubuntu text-base lg:text-lg text-center'>
            No need to install and configure programming language <br /> on your device. Just choose a programming language <br /> and write a few lines of code.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default HomePage
