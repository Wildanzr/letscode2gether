import { useStateContext } from '../../contexts/ContextProvider'

import Output from './Output'
import CustomInput from './Input'

const EditorOutput = () => {
  const { states }: any = useStateContext()

  const { colOutputHide } = states
  return (
    <div
      className={`${
        colOutputHide ? 'translate-y-0 h-0' : 'flex h-2/6'
      } flex-row w-full bg-pink-300 items-start justify-end translate-x-o transition-all ease-in-out duration-500`}
    >
        <CustomInput />
        <Output />
    </div>
  )
}

export default EditorOutput
