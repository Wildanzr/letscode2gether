import { useState } from 'react'

import { useCollab } from '../../contexts/CollabContext'
import { useGlobalContext } from '../../contexts/GlobalContext'

import CustomInput from './CustomInput'
import InputArea from './InputArea'

import { encode } from 'js-base64'

const Runner = () => {
  // Global States
  const { editorState } = useGlobalContext()
  const { setRun, showInput, setShowInput } = editorState

  // Collab States
  const { collabStates, collabFunctions, problemStates } = useCollab()
  const { code, language } = collabStates
  const { submission } = collabFunctions
  const { sampleTestCase, testCase } = problemStates

  // Local States
  const [input, setInput] = useState('')

  const runCode = async (mode) => {
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

    console.log(config)
    await submission(mode, config, showInput ? 'batch' : 'single')
  }

  return (
    <div className="flex flex-col w-full items-center space-y-4 text-white">
      {showInput && <InputArea input={input} setInput={setInput} />}

      <div className="flex flex-row w-full px-2 items-center justify-between">
        <CustomInput value={showInput} change={setShowInput} />
        <div className="flex flex-row items-center justify-start space-x-4">
          <button
            onClick={() => {
              runCode('run')
              setRun(true)
            }}
            className="flex py-1 px-1 lg:px-2 justify-center font-bold rounded-sm border-2 border-white hover:border-blue-500 duration-300"
          >
            RUN CODE
          </button>
          <button
            onClick={() => {
              runCode('submit')
              setRun(true)
            }}
            className="flex py-1 px-1 lg:px-2 justify-center bg-[#111827] font-bold rounded-sm border-b-2 border-white hover:border-blue-500 duration-300"
          >
            SUBMIT CODE
          </button>
        </div>
      </div>
    </div>
  )
}

export default Runner
