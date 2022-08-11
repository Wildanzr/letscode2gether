import { Button, Input } from 'antd'

const Leaderboards = () => {
  const { TextArea } = Input
  return (
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
  )
}

export default Leaderboards
