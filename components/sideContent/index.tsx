import { useStateContext } from '../../contexts/ContextProvider'

const SideContent = () => {
  const { states }: any = useStateContext()
  const { colSideHide, colSideContent } = states
  return (
    <div
      className={`${
        colSideHide ? '-translate-x-full w-0' : 'flex w-4/12 pl-3'
      } h-full bg-green-300 items-center justify-center translate-x-0 transition-all ease-in-out duration-500`}
    >
      <div className="flex flex-col w-full h-full items-center justify-center overflow-auto">
        <p>This is {colSideContent} section</p>
      </div>
    </div>
  )
}

export default SideContent
