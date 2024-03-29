import langConfig from '../../config/langConfig.json'
import { useGlobal } from '../../contexts/GlobalContext'
import { useCollab } from '../../contexts/CollabContext'

import Testcase from './Testcase'
import Skeleton from './Skeleton'

import { Tabs } from 'antd'

const Result = () => {
  // Global States
  const { editorState } = useGlobal()
  const { customInput } = editorState

  // Collab States
  const { problemStates } = useCollab()
  const { loading, result } = problemStates

  return (
    <>
      {loading
        ? (
        <Skeleton />
          )
        : (
        <div
          className={
            'flex w-full overflow-x-auto bg-easy dark:bg-main duration-300 ease-in-out'
          }
        >
          {result && result.length > 0
            ? (
            <Tabs
              type="card"
              className="w-full"
              items={result.map((item, index) => {
                return {
                  key: index + 1,
                  label: customInput
                    ? langConfig.problemCustomInput
                    : `${langConfig.problemSampleCase} ${index + 1}`,
                  children: <Testcase key={index} token={item} />
                }
              })}
            />
              )
            : null
          }
        </div>
          )}
    </>
  )
}

export default Result
