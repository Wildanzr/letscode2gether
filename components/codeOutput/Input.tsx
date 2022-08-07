import { useStateContext } from '../../contexts/ContextProvider'

import { Button, Input } from 'antd'

const CustomInput = () => {
  const { states }: any = useStateContext()

  const { colOutputHide } = states
  const { TextArea } = Input
  return (
    <div
      className={`${
        colOutputHide ? 'translate-y-0 h-0 hidden' : 'flex'
      } flex-col w-4/12 h-full items-center justify-center px-5 py-2 transition-all ease-in-out duration-500`}
    >
      <div className="flex flex-col w-full h-4/6 items-center justify-center pb-2">
        <TextArea rows={6} className="w-full h-full" />
      </div>
      <div className="flex flex-row w-full h-1/6 items-start justify-center pt-2">
        <Button type="default" className="mr-2">
          Run Code
        </Button>
        <Button type="primary" className="ml-2">
          Submit Code
        </Button>
      </div>
    </div>
  )
}

export default CustomInput
