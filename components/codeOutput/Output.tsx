import { useStateContext } from '../../contexts/ContextProvider'

import { CheckOutlined } from '@ant-design/icons'

import { Tabs, Input } from 'antd'

const Output = () => {
  const { states }: any = useStateContext()

  const { colOutputHide } = states

  // Components
  const { TabPane } = Tabs
  const { TextArea } = Input

  return (
    <div
      className={`${
        colOutputHide ? 'translate-y-0 h-0 hidden' : 'flex'
      } flex-col w-8/12 h-full items-start justify-start px-2 py-2 bg-yellow-400 transition-all ease-in-out duration-500`}
    >
      <div className="flex flex-row w-full items-start justify-between">
        <div className="flex">
          <p className='text-base font-semibold mb-0'>Output</p>
        </div>

        <div className="flex flex-row items-start justify-evenly">
          <div className="flex flex-row mx-1">
            <p className='text-xs mb-0 mr-1'>Result:</p>
            <p className='text-xs font-bold mb-0'>Accepted</p>
          </div>

          <div className="flex flex-row mx-1">
            <p className='text-xs mb-0 mr-1'>Memory:</p>
            <p className='text-xs font-bold mb-0'>33020</p>
          </div>

          <div className="flex flex-row mx-1">
            <p className='text-xs mb-0 mr-1'>Time:</p>
            <p className='text-xs font-bold mb-0'>0.008</p>
          </div>
        </div>
      </div>
      <Tabs defaultActiveKey="1" type="card" size='small' className='bg-blue-400 w-full h-full mb-0'>
        <TabPane
          tab={<span className='flex items-center justify-center'>
            Testcase 1
            <CheckOutlined className='pl-2'/>
            </span>
          }
          key="1"
          className='flex px-2 py-2 h-full w-full'>
            <div className="flex flex-row w-full h-full items-start justify-between">
            <TextArea autoSize={{ minRows: 2, maxRows: 3 }} disabled value={'Hello World\nHello World\nHello World\nHello World'} className='font-mono'/>
            </div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Output
