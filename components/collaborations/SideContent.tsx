import { useStateContext } from '../../contexts/ContextProvider'

import { Problems, Submissions, Leaderboards } from '../sideContent'

const SideContent = () => {
  const { collabStates }: any = useStateContext()

  const {
    colHide,
    colSideContent
  } = collabStates

  return (
    <div
      className={`flex ${
        colHide
          ? 'w-full lg:w-1/2 h-full py-2 px-2'
          : 'w-full lg:w-0 h-0 lg:h-full py-0 px-0'
      } bg-[#4B5563] gap-4 transition-all ease-in-out duration-500 overflow-y-auto`}
    >
      <div className={`${colHide ? 'flex' : 'hidden'} flex-col w-full h-full`}>
        {colSideContent === 'problems' ? <Problems /> : colSideContent === 'submissions' ? <Submissions /> : <Leaderboards />}
      </div>
    </div>
  )
}

export default SideContent
