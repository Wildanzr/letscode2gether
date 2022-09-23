import { Tabs } from 'antd'
import Testcase from './Testcase'

// import './result.css'

const { TabPane } = Tabs

const Result = () => {
  return (
    <div className={'flex w-full overflow-x-auto bg-[#1F2937]'}>
      <Tabs type="card" className="w-full">
        <TabPane tab="Testcase 1" key="1">
          <Testcase />
        </TabPane>
        <TabPane tab="Testcase 2" key="2">
          <Testcase />
        </TabPane>
        <TabPane tab="Testcase 3" key="3">
          <Testcase />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Result
