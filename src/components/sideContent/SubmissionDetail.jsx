import { useEffect } from 'react'

import { useGlobal } from '../../contexts/GlobalContext'

import TestCaseResult from './TestCaseResult'

import { Tag } from 'antd'
import Editor from '@monaco-editor/react'

const SubmissionDetail = (props) => {
  // Destructure props
  const { submissionId } = props

  // Global States
  const { editorState } = useGlobal()
  const { theme } = editorState

  // Initially get submission detail
  useEffect(() => {
    console.log(submissionId)
  }, [])
  return (
    <>
      <div className="flex flex-row w-full pb-0">
        <p className="mb-0 pr-2 font-semibold text-white">Score:</p>
        <Tag color="blue" className="font-semibold">
          100
        </Tag>
      </div>

      <div className="flex flex-col w-full h-full">
        <TestCaseResult />
        <p className="mb-2 text-white">Source Code:</p>
        <div className="flex flex-col w-full h-40">
          <Editor
            height={'100%'}
            width={'100%'}
            language={''}
            theme={theme}
            defaultValue="// Lets solve this problem!"
            options={{ readOnly: true }}
          />
        </div>
      </div>
    </>
  )
}

export default SubmissionDetail
