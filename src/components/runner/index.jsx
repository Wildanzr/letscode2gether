import langConfig from '../../config/langConfig.json'
import { useState, useEffect } from 'react'

import { useGlobal } from '../../contexts/GlobalContext'
import { useAuth } from '../../contexts/AuthContext'
import { useCollab } from '../../contexts/CollabContext'

import CustomInput from './CustomInput'
import InputArea from './InputArea'

import { encode } from 'js-base64'
import { useParams } from 'react-router-dom'
import { RiLockFill } from 'react-icons/ri'

const Runner = () => {
  // useParams
  const { competeProblemId = 'collaboration' } = useParams()

  // Global States
  const { editorState, globalFunctions, globalState } = useGlobal()
  const { setRun, showInput, setShowInput, setCustomInput } = editorState
  const { mySwal } = globalFunctions
  const { setColHide, setColSideContent, isOnlyEditor, timeOut } = globalState

  // Auth States
  const { authStates } = useAuth()
  const { user } = authStates

  // Collab States
  const { collabStates, problemStates } = useCollab()
  const { code, language, socket } = collabStates
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
    const formattedInput = input === '' || input === null ? null : encode(input)
    return {
      language_id: language,
      source_code: encode(code),
      stdin: formattedInput
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
        config = competeProblemId !== 'collaboration'
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

    const runMode = type === 'submission' ? 'batch' : showInput ? 'single' : 'batch'

    if (type === 'submission') judgeSubmit(config, runMode, type)
    else judgeRun(config, runMode, type)

    setCustomInput(showInput)
  }

  // Judge run code
  const judgeRun = (config, mode, type) => {
    // Disable button
    setBtnDisabled(true)

    // Set loading
    if (type === 'run') {
      setLoading(true)
    }

    // Create payload
    const payload = {
      config,
      mode,
      type
    }

    // Emit run code event
    socket.emit('req_run_code', payload)
  }

  // Handle judge run code
  const handleJudge = async (res) => {
    if (res.status) {
      // Destructure response
      const { tokens, type, mode } = res.data

      // Set result
      if (type === 'run') {
        setResult(tokens)

        // Set loading and mode
        setLoading(false)
        setRunMode(mode)
      } else {
        // wait for 800ms
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setColHide(true)
        setColSideContent('submissions')
      }
    } else {
      setLoading(false)

      // Show error
      mySwal.fire({
        icon: 'error',
        title: res.message,
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true
      })
    }

    // Enable button after submission
    setBtnDisabled(false)
  }

  // Judge submit code
  const judgeSubmit = (config, mode, type) => {
    // Disable button
    setBtnDisabled(true)

    // Set loading
    if (type === 'run') {
      setLoading(true)
    }

    // Create payload
    const payload = {
      userId: user ? user._id : 'guest',
      competeProblemId,
      languageCode: language,
      code,
      config,
      mode,
      type
    }

    // console.log(payload)

    // Emit run code event
    socket.emit('req_submit_code', payload)
  }

  // Dialog for submission
  const submitDialog = () => {
    // Check if user is logged in
    if (!user) {
      // Show error
      mySwal.fire({
        icon: 'error',
        title: langConfig.collabMustLogin,
        allowOutsideClick: true,
        backdrop: true,
        allowEscapeKey: true,
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true
      })

      return
    }

    mySwal
      .fire({
        title: 'Kumpulkan kode?',
        text: langConfig.dialogSubmitCode,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya, kumpulkan!',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Nanti saja',
        reverseButtons: true
      })
      .then((result) => {
        if (result.isConfirmed) {
          runCode('submit', 'submission')
          setRun(true)
          setResult([])
          setColHide(true)
          setColSideContent('problems')
        }
      })
  }

  // Websocket
  useEffect(() => {
    // Listeners
    socket.on('res_run_code', handleJudge)
    socket.on('res_submit_code', handleJudge)

    // Clean up
    return () => {
      socket.off('res_run_code', handleJudge)
      socket.off('res_submit_code', handleJudge)
    }
  }, [socket])

  return (
    <div className="flex flex-col w-full items-center space-y-4 px-5 text-main dark:text-snow">
      {showInput && <InputArea input={input} setInput={setInput} />}

      <div className="flex flex-row w-full px-2 items-center justify-between">
        <div className="flex rt-custom-input">
          <CustomInput value={showInput} change={setShowInput} />
        </div>
        <div className="flex flex-row items-center justify-start space-x-4">
          <button
            disabled={btnDisabled || timeOut}
            onClick={() => {
              if (language === null) {
                mySwal.fire({
                  icon: 'error',
                  title: langConfig.collabSubmitWarn,
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
            className={`rt-code-run flex py-1 px-1 lg:px-2 items-center justify-center font-bold font-code tracking-wider rounded-sm text-main dark:text-snow border-2 border-main dark:border-white hover:border-easy hover:text-main dark:hover:border-blue-500 duration-300 ${
              btnDisabled
                ? 'border-gray-300 text-gray-300 hover:border-gray-300'
                : ''
            }`}
          >
            {timeOut && (
              <RiLockFill className="mr-1 fill-main dark:fill-snow duration-300 ease-in-out" />
            )}
            {langConfig.collabRun}
          </button>

          {!isOnlyEditor && (
            <button
              disabled={btnDisabled || timeOut}
              onClick={() => {
                if (language === null) {
                  mySwal.fire({
                    icon: 'error',
                    title: langConfig.collabSubmitWarn,
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
              className={`rt-code-submit flex py-1 px-1 lg:px-2 items-center justify-center font-bold font-code tracking-wider bg-easy dark:bg-main rounded-sm border-b-2 text-snow border-white hover:border-medium dark:hover:border-blue-500 duration-300 ${
                btnDisabled
                  ? 'border-gray-300 text-gray-300 hover:border-gray-300'
                  : ''
              }`}
            >
              {timeOut && (
                <RiLockFill className="mr-1 fill-main dark:fill-snow duration-300 ease-in-out" />
              )}
              {langConfig.collabSubmit}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Runner
