import { useStateContext } from '../../contexts/ContextProvider'

import { Problem } from '../sideContent'

const SideContent = () => {
  const { collabStates } = useStateContext()

  const { colHide } = collabStates

  return (
    <div
      className={`flex ${
        colHide
          ? 'w-full lg:w-1/2 h-full py-2 px-2'
          : 'w-full lg:w-0 h-0 lg:h-full py-0 px-0'
      } bg-gray-300 transition-all ease-in-out duration-500`}
    >
      <div
        className={`${
          colHide ? 'flex' : 'hidden'
        } flex-col w-full h-full overflow-y-auto`}
      >
        <Problem />
      </div>
    </div>
  )
}

export default SideContent
