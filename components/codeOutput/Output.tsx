import { useStateContext } from '../../contexts/ContextProvider'

const Output = () => {
  const { states }: any = useStateContext()

  const { colOutputHide } = states
  return (
    <div
      className={`${
        colOutputHide ? 'translate-y-0 h-0 hidden' : 'flex'
      } flex-col w-8/12 h-full items-center justify-center text-white transition-all ease-in-out duration-500`}
    >
      <p>This is output</p>
    </div>
  )
}

export default Output
