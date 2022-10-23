import Journey from '../../assets/journey.svg'
import B6 from '../../assets/badge6.svg'
import { Navbar, Footer } from '../../layout'

const JourneyPage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen space-y-14 bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <Navbar />

      <div className="flex px-[5%] flex-col lg:flex-row-reverse w-full items-center justify-center lg:justify-between">
        <div className="flex w-full lg:w-1/3 items-center justify-center">
          <img src={Journey} className="flex w-[60%]" />
        </div>

        <div className="flex w-full lg:w-2/3 items-center justify-center">
          <div className="flex flex-col w-full space-y-4 lg:space-y-8 items-center lg:items-start">
            <p className='text-3xl text-center lg:text-left mb-0 lg:text-5xl font-ubuntu font-medium'>
              Learning Journey
            </p>
            <p className='flex lg:hidden font-ubuntu text-base lg:text-lg text-center lg:text-left'>
            This platform provides basic programming learning materials based on problem. Without siding with
            any of the programming languages. Here you can learn basic programming concepts then
            apply them to many programming languages.
            </p>
            <p className='hidden lg:flex font-ubuntu text-base lg:text-lg text-center lg:text-left'>
            This platform provides basic programming learning materials based on problem. Without siding with
            any of the programming languages. Here you can learn basic programming concepts then
            apply them to many programming languages.
            </p>

            <div className='flex flex-row space-x-4 items-center'>
              <p className='mb-0 text-2xl font-ubuntu font-bold'>
                Overral progress:
              </p>
              <span className='mb-0 text-2xl font-ubuntu font-bold text-success'>30%</span>
            </div>
            <div className='flex flex-row space-x-4 items-center'>
              <p className='mb-0 text-2xl font-ubuntu font-bold'>
                Current badges:
              </p>
              <img src={B6} alt="badge" className='w-10' />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-5 w-full px-[5%]">
        <div className="flex w-full px-5 py-3 rounded-lg border-2 lg:border-4 border-easy bg-gradient-to-r from-[#CCF3F6] dark:from-[#30143F] via-[#DDCFF0] dark:via-[#151223] to:[#DCE7B3] dark:to-[#151729] duration-300 ease-out">
          <div className="flex flex-col space-y-8 lg:space-y-0 lg:flex-row w-full h-full justify-between items-start">
            <div className="flex flex-col w-full h-full space-y-4">
              <p className='mb-0 text-xl font-ubuntu font-medium'>Section 1 - Input Output</p>
              <ul className='space-y-4'>
                <li>
                  <div className="flex flex-row font-ubuntu items-center">
                    <div className="flex w-2/6 items-center justify-start">
                        <p className='mb-0 text-sm'>Hello World</p>
                    </div>
                    <div className="flex w-2/6 justify-center lg:justify-start items-center">
                      <p className='mb-0 text-sm text-success'>easy</p>
                    </div>
                    <div className="flex w-2/6 space-x-6 justify-end lg:justify-start items-center">
                      <button className='w-4/6 py-2 bg-snow text-main rounded font-medium lg:font-bold'>Solved</button>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="flex flex-row font-ubuntu items-center">
                    <div className="flex w-2/6 items-center justify-start">
                        <p className='mb-0 text-sm'>Apakah Ini Belum Terlalu Panjang</p>
                    </div>
                    <div className="flex w-2/6 justify-center lg:justify-start items-center">
                      <p className='mb-0 text-sm text-medium'>medium</p>
                    </div>
                    <div className="flex w-2/6 space-x-6 justify-end lg:justify-start items-center">
                      <button className='w-4/6 py-2 bg-medium text-main rounded font-medium lg:font-bold'>Try Again</button>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="flex flex-row font-ubuntu items-center">
                    <div className="flex w-2/6 items-center justify-start">
                        <p className='mb-0 text-sm'>Introduce Myself</p>
                    </div>
                    <div className="flex w-2/6 justify-center lg:justify-start items-center">
                      <p className='mb-0 text-sm text-hard'>hard</p>
                    </div>
                    <div className="flex w-2/6 space-x-6 justify-end lg:justify-start items-center">
                      <button className='w-4/6 py-2 bg-success text-snow rounded font-medium lg:font-bold'>Lets Solve</button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="flex flex-row lg:flex-col items-center text-xl space-x-4 lg:space-y-4">
              <p className='mb-0 text-left lg:text-center font-ubuntu font-medium'>Your Progress:</p>
              <p className='mb-0 lg:text-4xl text-left lg:text-center text-success font-ubuntu font-medium'>1/3</p>
            </div>
          </div>
        </div>

        <div className="flex w-full px-5 py-3 rounded-lg border-2 lg:border-4 border-easy bg-gradient-to-r from-[#CCF3F6] dark:from-[#30143F] via-[#DDCFF0] dark:via-[#151223] to:[#DCE7B3] dark:to-[#151729] duration-300 ease-out">
          <div className="flex flex-col space-y-8 lg:space-y-0 lg:flex-row w-full h-full justify-between items-start">
            <div className="flex flex-col w-full h-full space-y-4">
              <p className='mb-0 text-xl font-ubuntu font-medium'>Section 2 - Basic Operators</p>
              <ul className='space-y-4'>
                <li>
                  <div className="flex flex-row font-ubuntu items-center">
                    <div className="flex w-2/6 items-center justify-start">
                        <p className='mb-0 text-sm'>Hello World</p>
                    </div>
                    <div className="flex w-2/6 justify-center lg:justify-start items-center">
                      <p className='mb-0 text-sm text-success'>easy</p>
                    </div>
                    <div className="flex w-2/6 space-x-6 justify-end lg:justify-start items-center">
                      <button className='w-4/6 py-2 bg-snow text-main rounded font-medium lg:font-bold'>Solved</button>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="flex flex-row font-ubuntu items-center">
                    <div className="flex w-2/6 items-center justify-start">
                        <p className='mb-0 text-sm'>Apakah Ini Belum Terlalu Panjang</p>
                    </div>
                    <div className="flex w-2/6 justify-center lg:justify-start items-center">
                      <p className='mb-0 text-sm text-medium'>medium</p>
                    </div>
                    <div className="flex w-2/6 space-x-6 justify-end lg:justify-start items-center">
                      <button className='w-4/6 py-2 bg-medium text-main rounded font-medium lg:font-bold'>Try Again</button>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="flex flex-row font-ubuntu items-center">
                    <div className="flex w-2/6 items-center justify-start">
                        <p className='mb-0 text-sm'>Introduce Myself</p>
                    </div>
                    <div className="flex w-2/6 justify-center lg:justify-start items-center">
                      <p className='mb-0 text-sm text-hard'>hard</p>
                    </div>
                    <div className="flex w-2/6 space-x-6 justify-end lg:justify-start items-center">
                      <button className='w-4/6 py-2 bg-success text-snow rounded font-medium lg:font-bold'>Lets Solve</button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="flex flex-row lg:flex-col items-center text-xl space-x-4 lg:space-y-4">
              <p className='mb-0 text-left lg:text-center font-ubuntu font-medium'>Your Progress:</p>
              <p className='mb-0 lg:text-4xl text-left lg:text-center text-success font-ubuntu font-medium'>1/3</p>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default JourneyPage
