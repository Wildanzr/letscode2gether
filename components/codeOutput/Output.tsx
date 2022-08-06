import { useStateContext } from '../../contexts/ContextProvider'

const Output = () => {
  const { states }: any = useStateContext()

  const { colOutputHide } = states
  return (
    <div
      className={`${
        colOutputHide ? 'translate-y-0 h-0 hidden' : 'flex'
      } flex-col w-8/12 h-full bg-fuchsia-700 items-end justify-start text-white px-2 transition-all ease-in-out duration-500`}
    ></div>
  )
}

export default Output
