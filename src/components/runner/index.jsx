import { useState } from 'react'

import { useCollab } from '../../contexts/CollabContext'
import { useGlobal } from '../../contexts/GlobalContext'

import CustomInput from './CustomInput'
import InputArea from './InputArea'

import { encode } from 'js-base64'

const Runner = () => {
  // Global States
  const { editorState, globalFunctions } = useGlobal()
  const { setRun, showInput, setShowInput, setCustomInput } = editorState
  const { mySwal } = globalFunctions

  // Collab States
  const { collabStates, collabFunctions, problemStates } = useCollab()
  const { code, language } = collabStates
  const { submission } = collabFunctions
  const { sampleTestCase, testCase, btnDisabled } = problemStates

  // Local States
  const [input, setInput] = useState('')

  const runCode = async (mode, type) => {
    let config = {}
    if (mode === 'run') {
      if (showInput) {
        // Todo : run code with input
        config = {
          language_id: language,
          source_code: encode(code),
          stdin: encode(input)
        }
      } else {
        // Todo : run code without input
        config = {
          submissions: sampleTestCase.map((sample) => {
            return {
              language_id: language,
              source_code: encode(code),
              stdin: encode(sample.input),
              expected_output: encode(sample.expected)
            }
          })
        }
      }
    } else {
      // Todo : submit code
      const sample = sampleTestCase.map((sample) => {
        return {
          language_id: language,
          source_code: encode(code),
          stdin: encode(sample.input),
          expected_output: encode(sample.expected)
        }
      })
      const test = testCase.map((test) => {
        return {
          language_id: language,
          source_code: encode(code),
          stdin: encode(test.input),
          expected_output: encode(test.expected)
        }
      })
      config = {
        submissions: [...sample, ...test]
      }
    }

    // console.log(config)
    // console.log(type)
    const runMode = type === 'submission' ? 'batch' : showInput ? 'single' : 'batch'
    await submission(config, runMode, type)
    setCustomInput(showInput)
  }

  const submitDialog = () => {
    mySwal.fire({
      title: 'Submit Code?',
      text: 'Are you sure you want to submit your code?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        runCode('submit', 'submission')
        setRun(true)
      }
    })
  }

  return (
    <div className="flex flex-col w-full items-center space-y-4 text-main dark:text-snow">
      {showInput && <InputArea input={input} setInput={setInput} />}

      <div className="flex flex-row w-full px-2 items-center justify-between">
        <CustomInput value={showInput} change={setShowInput} />
        <div className="flex flex-row items-center justify-start space-x-4">
          <button
            disabled={btnDisabled}
            onClick={() => {
              runCode('run', 'run')
              setRun(true)
            }}
            className={`flex py-1 px-1 lg:px-2 justify-center font-bold font-code tracking-wider rounded-sm text-easy dark:text-snow border-2 border-easy dark:border-white hover:border-main hover:text-main dark:hover:border-blue-500 duration-300 ${btnDisabled ? 'border-gray-300 text-gray-300 hover:border-gray-300' : ''}`}
          >
            RUN CODE
          </button>
          <button
            disabled={btnDisabled}
            onClick={() => {
              submitDialog()
            }}
            className={`flex py-1 px-1 lg:px-2 justify-center font-bold font-code tracking-wider bg-easy dark:bg-main rounded-sm border-b-2 text-snow border-white hover:border-medium dark:hover:border-blue-500 duration-300 ${btnDisabled ? 'border-gray-300 text-gray-300 hover:border-gray-300' : ''}`}
          >
            SUBMIT CODE
          </button>
        </div>
      </div>
    </div>
  )
}

export default Runner
