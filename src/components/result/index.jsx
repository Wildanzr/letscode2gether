import { useGlobal } from '../../contexts/GlobalContext'
import { useCollab } from '../../contexts/CollabContext'

import Testcase from './Testcase'
import Skeleton from './Skeleton'

import { Tabs } from 'antd'
import { decode } from 'js-base64'

const Result = () => {
  // Global States
  const { editorState } = useGlobal()
  const { customInput } = editorState

  // Collab States
  const { problemStates } = useCollab()
  const { sampleTestCase, loading, result, runMode } = problemStates

  const runResult = runMode === 'single' ? result : sampleTestCase

  return loading
    ? (
    <Skeleton />
      )
    : (
    <div className={'flex w-full overflow-x-auto bg-[#1F2937]'}>
      <Tabs
        type="card"
        className="w-full"
        items={runResult.map((item, index) => {
          const { stdin, stdout, status, memory, time } = result[index]
          return {
            key: index + 1,
            label: customInput ? 'Custom Input' : `Testcase ${index + 1}`,
            children: (
              <Testcase
                input={stdin === '' || stdin === null ? null : decode(stdin)}
                output={stdout === '' || stdout === null ? null : decode(stdout)}
                expected={item.expected}
                key={`testcase-${index}`}
                status={status}
                memory={memory}
                time={time}
              />
            )
          }
        })}
      />
    </div>
      )
}

export default Result
