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
      } flex-col w-4/12 h-full items-start justify-start px-2 py-2 transition-all ease-in-out duration-500`}
    >
      <div className="flex flex-row w-full items-start justify-between">
        <div className="flex">
          <p className='text-base font-semibold mb-0'>Input</p>
        </div>
      </div>

      <div className="flex flex-col w-full h-full items-start justify-between">
        <div className="flex flex-col w-full items-start justify-start">
          <TextArea autoSize={{ minRows: 4, maxRows: 4 }} allowClear placeholder='Custom Input' className='font-mono'/>
        </div>
        <div className="flex flex-row w-full items-start justify-center">
          <Button type="default" className="mr-2">
            Run Code
          </Button>
          <Button type="primary" className="ml-2">
            Submit Code
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CustomInput
