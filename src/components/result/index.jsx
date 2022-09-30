import { useCollab } from '../../contexts/CollabContext'

import Testcase from './Testcase'
import Skeleton from './Skeleton'

import { Tabs } from 'antd'
import { decode } from 'js-base64'

const Result = () => {
  // Collab States
  const { problemStates } = useCollab()
  const { sampleTestCase, loading, result } = problemStates

  return (
    loading
      ? (
      <Skeleton />
        )
      : (
      <div className={'flex w-full overflow-x-auto bg-[#1F2937]'}>
      <Tabs
        type="card"
        className="w-full"
        items={sampleTestCase.map((item, index) => ({
          key: index + 1,
          label: `Testcase ${index + 1}`,
          children: <Testcase
            input={item.input}
            output={decode(result[index].stdout)}
            expected={item.expected}
            key={`testcase-${index}`}
            status={result[index].status.description}
            memory={result[index].memory}
            time={result[index].time}
            />
        }))}
      />
    </div>
        )
  )
}

export default Result
