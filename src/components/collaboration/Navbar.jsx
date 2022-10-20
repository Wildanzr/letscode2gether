import { useGlobal } from '../../contexts/GlobalContext'

const Navbar = () => {
  const { globalState } = useGlobal()

  const { colHide, setColHide, colSideContent, setColSideContent } = globalState

  const handleChangeSideContent = (origin) => {
    if (colHide && colSideContent === origin) {
      setColHide(false)
    } else {
      setColHide(true)
    }

    setColSideContent(origin)
    switch (origin) {
      case 'problems':
        setColSideContent('problems')
        break
      case 'submissions':
        setColSideContent('submissions')
        break
      case 'leaderboards':
        setColSideContent('leaderboards')
        break
    }
  }
  return (
    <div className="flex flex-row lg:flex-col w-full lg:w-[10%] h-[7%] lg:h-screen py-2 px-2 z-40 bg-[#1F2937] items-center">
      <div className="flex w-1/6 lg:w-full h-full lg:h-[10%] items-center justify-center text-white bg-red-300" />
      <div className="flex flex-row lg:flex-col w-5/6 lg:w-full space-x-4 lg:space-y-4 lg:space-x-0 lg:mt-5 items-center justify-center text-white">
        <button
          className="flex py-1 px-2 lg:w-full justify-center bg-[#111827] rounded-sm border-b-2 border-white hover:border-blue-500 duration-300"
          onClick={() => handleChangeSideContent('problems')}
        >
          Problems
        </button>
        <button
          className="flex py-1 px-2 lg:w-full justify-center bg-[#111827] rounded-sm border-b-2 border-white hover:border-blue-500 duration-300"
          onClick={() => handleChangeSideContent('submissions')}
        >
          Submissions
        </button>
        <button
          className="flex py-1 px-2 lg:w-full justify-center bg-[#111827] rounded-sm border-b-2 border-white hover:border-blue-500 duration-300"
          onClick={() => handleChangeSideContent('leaderboards')}
        >
          Leaderboards
        </button>
      </div>
    </div>
  )
}

export default Navbar
