import { useState, useEffect } from 'react'
import { languageOptions } from '../../constants/languageOptions'

import { useGlobal } from '../../contexts/GlobalContext'

import api from '../../api'
import TestCaseResult from './TestCaseResult'

import Cookies from 'js-cookie'
import { Spin, Tag } from 'antd'
import Editor from '@monaco-editor/react'
import { useParams } from 'react-router-dom'

const SubmissionDetail = (props) => {
  // Destructure props
  const { submissionId } = props

  // useParams
  const { competeProblemId } = useParams()

  // Global States
  const { editorState } = useGlobal()
  const { theme } = editorState

  // Local States
  const [submission, setSubmission] = useState(null)

  // Get submission detail
  const getSubmissionDetail = async () => {
    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get(
        `/compete-problems/${competeProblemId}/submissions/${submissionId}`,
        config
      )
      const { submission } = data.data
      //   console.log(data)

      // Set Value
      setSubmission(submission)
    } catch (error) {
      console.log(error)
    }
  }

  // Transform language allowed
  const transformLanguageAllowed = (selected) => {
    const languageAllowed = languageOptions
      .filter(lang => selected === lang.id)
      .map(lang => lang.label)

    return (
      <>
        {languageAllowed.map((lang, index) => (
          <Tag
            key={index}
            color="default"
            className='font-ubuntu font-medium'
          >
            <span className='text-easy'>
              {lang}
            </span>
          </Tag>
        ))}
      </>
    )
  }

  // Initially get submission detail
  useEffect(() => {
    getSubmissionDetail()
  }, [])
  return (
    <div className="flex flex-col w-full items-center justify-center">
      {submission === null
        ? <Spin size="default" />
        : (
        <div className="w-full flex flex-col space-y-2">
          {/* Language */}
          <div className="flex flex-row w-full pb-0 space-x-2 text-white">
            <p className="mb-0 font-medium">Language:</p>
            <p className="mb-0 font-bold text-success">{transformLanguageAllowed(submission.languageCode)}</p>
          </div>

          <div className="flex flex-col w-full h-full">
            <TestCaseResult tokens={submission.tokens} />
            <p className="mb-2 text-white">Source Code:</p>
            <div className="flex flex-col w-full h-80">
              <Editor
                height={'100%'}
                width={'100%'}
                language={''}
                theme={theme}
                defaultValue={submission.code || '// Lets solve this problem!'}
                options={{ readOnly: true }}
              />
            </div>
          </div>
        </div>
          )}
    </div>
  )
}

export default SubmissionDetail
