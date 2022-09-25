import { Tabs } from 'antd'
import Testcase from './Testcase'

const Result = () => {
  return (
    <div className={'flex w-full overflow-x-auto bg-[#1F2937]'}>
      <Tabs
        type="card"
        className="w-full"
        items={[
          {
            key: '1',
            label: 'Testcase 1',
            children: <Testcase />
          },
          {
            key: '2',
            label: 'Testcase 2',
            children: <Testcase />
          },
          {
            key: '3',
            label: 'Testcase 3',
            children: <Testcase />
          },
          {
            key: '4',
            label: 'Testcase 4',
            children: <Testcase />
          }
        ]}
      />
    </div>
  )
}

export default Result
