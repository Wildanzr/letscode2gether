import { useState } from 'react'

import { useCollab } from '../../contexts/CollabContext'
import { useGlobal } from '../../contexts/GlobalContext'

import CustomInput from './CustomInput'
import InputArea from './InputArea'

import axios from 'axios'
import { encode } from 'js-base64'

const Runner = () => {
  // Global States
  const { editorState, globalFunctions, globalState } = useGlobal()
  const { setRun, showInput, setShowInput, setCustomInput } = editorState
  const { mySwal } = globalFunctions
  const { setColHide, setColSideContent, isOnlyEditor } = globalState

  // Collab States
  const { collabStates, problemStates } = useCollab()
  const { code, language } = collabStates
  const {
    btnDisabled,
    setBtnDisabled,
    setLoading,
    setResult,
    setRunMode,
    competeProblem
  } = problemStates

  // Local States
  const [input, setInput] = useState('')

  // Mapping sample cases to submission config
  const sampleConfig = (sampleCases) => {
    return sampleCases.map((sample) => {
      return {
        language_id: language,
        source_code: encode(code),
        stdin: encode(sample.input),
        expected_output: encode(sample.output)
      }
    })
  }

  // Mapping test cases to submission config
  const testConfig = (testCases) => {
    return testCases.map((test) => {
      return {
        language_id: language,
        source_code: encode(code),
        stdin: encode(test.input),
        expected_output: encode(test.output)
      }
    })
  }

  // Mapping collab config to run code
  const collabConfig = () => {
    return {
      language_id: language,
      stdin: null,
      source_code: encode(code)
    }
  }

  // Mapping config with custom input
  const configWithInput = () => {
    return {
      language_id: language,
      source_code: encode(code),
      stdin: encode(input)
    }
  }

  // Add runner options to config object
  const addRunnerOptions = (config) => {
    // Check if config is array of object or single object
    if (config.submissions) {
      // Spread the config object and add runner options
      config.submissions.forEach(submission => {
        submission.cpu_time_limit = '5'
        submission.cpu_extra_time = '1'
        submission.wall_time_limit = '10'
        submission.memory_limit = '128000'
        submission.stack_limit = '64000'
      })
    } else {
      config.cpu_time_limit = '5'
      config.cpu_extra_time = '1'
      config.wall_time_limit = '10'
      config.memory_limit = '128000'
      config.stack_limit = '64000'
    }

    return config
  }

  // Submission Functions
  const submission = async (config, mode, type) => {
    // Disable button
    setBtnDisabled(true)

    // Set loading
    if (type === 'run') {
      setLoading(true)
    }

    // Define API URL
    const url =
      mode === 'single'
        ? import.meta.env.VITE_RAPID_API_URL
        : `${import.meta.env.VITE_RAPID_API_URL}/batch`

    // Define API Payload
    const options = {
      method: 'POST',
      url,
      params: { base64_encoded: 'true', fields: '*' },
      data: config
    }

    // Collet token results
    let tokens = []
    try {
      const res = await axios.request(options)
      if (mode === 'single') {
        tokens.push(res.data.token)
      } else {
        tokens = res.data.map((data) => data.token)
      }

      // Set result
      if (type === 'run') {
        setResult(tokens)

        // Set loading and mode
        setLoading(false)
        setRunMode(mode)
      } else {
        setColHide(true)
        setColSideContent('submissions')
      }

      // Enable button after submission
      setBtnDisabled(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
      setBtnDisabled(false)
      setRunMode(mode)
    }
  }

  // Run Code
  const runCode = async (mode, type) => {
    // Create submission config
    let config = {}
    if (mode === 'run') {
      // mode is run
      if (showInput) {
        // there is a custom input
        config = configWithInput()
      } else {
        // no custom input
        config = competeProblem
          ? { submissions: sampleConfig(competeProblem.sampleCases) }
          : { submissions: [collabConfig()] }
      }
    } else {
      // mode is submit
      const sample = sampleConfig(competeProblem.sampleCases)
      const test = testConfig(competeProblem.testCases)

      config = { submissions: [...sample, ...test] }
    }

    // Add runner options
    config = addRunnerOptions(config)
    console.log(config)

    const runMode = type === 'submission' ? 'batch' : showInput ? 'single' : 'batch'
    await submission(config, runMode, type)
    setCustomInput(showInput)
  }

  // Dialog for submission
  const submitDialog = () => {
    mySwal
      .fire({
        title: 'Submit Code?',
        text: 'Are you sure you want to submit your code?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, submit it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: false
      })
      .then((result) => {
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
              if (language === null) {
                mySwal.fire({
                  icon: 'error',
                  title: 'Please select a language first',
                  allowOutsideClick: true,
                  backdrop: true,
                  allowEscapeKey: true,
                  timer: 2000,
                  timerProgressBar: true,
                  showConfirmButton: false
                })
                return
              }
              runCode('run', 'run')
              setRun(true)
            }}
            className={`flex py-1 px-1 lg:px-2 justify-center font-bold font-code tracking-wider rounded-sm text-easy dark:text-snow border-2 border-easy dark:border-white hover:border-main hover:text-main dark:hover:border-blue-500 duration-300 ${
              btnDisabled
                ? 'border-gray-300 text-gray-300 hover:border-gray-300'
                : ''
            }`}
          >
            RUN CODE
          </button>

          {!isOnlyEditor && (
            <button
              disabled={btnDisabled}
              onClick={() => {
                if (language === null) {
                  mySwal.fire({
                    icon: 'error',
                    title: 'Please select a language first',
                    allowOutsideClick: true,
                    backdrop: true,
                    allowEscapeKey: true,
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false
                  })
                  return
                }
                submitDialog()
              }}
              className={`flex py-1 px-1 lg:px-2 justify-center font-bold font-code tracking-wider bg-easy dark:bg-main rounded-sm border-b-2 text-snow border-white hover:border-medium dark:hover:border-blue-500 duration-300 ${
                btnDisabled
                  ? 'border-gray-300 text-gray-300 hover:border-gray-300'
                  : ''
              }`}
            >
              SUBMIT CODE
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Runner
