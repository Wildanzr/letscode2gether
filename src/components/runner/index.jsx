import { useState } from 'react'

import { useCollab } from '../../contexts/CollabContext'
import { useGlobalContext } from '../../contexts/GlobalContext'

import CustomInput from './CustomInput'
import InputArea from './InputArea'

const Runner = () => {
  // Global States
  const { editorState } = useGlobalContext()
  const { setRun } = editorState

  // Collab States
  const { collabFunctions } = useCollab()
  const { submission } = collabFunctions

  // Local States
  const [showInput, setShowInput] = useState(false)

  return (
    <div className="flex flex-col w-full items-center space-y-4 text-white">
      {showInput && <InputArea />}

      <div className="flex flex-row w-full px-2 items-center justify-between">
        <CustomInput value={showInput} change={setShowInput} />
        <div className="flex flex-row items-center justify-start space-x-4">
          <button
            onClick={() => {
              submission('run')
              setRun(true)
            }}
            className="flex py-1 px-1 lg:px-2 justify-center font-bold rounded-sm border-2 border-white hover:border-blue-500 duration-300"
          >
            RUN CODE
          </button>
          <button
            onClick={() => submission('submit')}
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
