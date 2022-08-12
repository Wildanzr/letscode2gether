import { useState } from 'react'

import CustomInput from './CustomInput'
import InputArea from './InputArea'

const Runner = () => {
  const [showInput, setShowInput] = useState(false)

  return (
    <div className="flex flex-col w-full items-center gap-4 text-white">
      {showInput && <InputArea />}

      <div className="flex flex-row w-full px-2 items-center justify-between">
        <CustomInput value={showInput} change={setShowInput}/>
        <div className="flex flex-row items-center justify-start gap-4">
          <button className="flex py-1 px-1 lg:px-2 justify-center font-bold rounded-sm border-2 border-white hover:border-blue-500 hover:text-blue-500 duration-300">
            RUN CODE
          </button>
          <button className="flex py-1 px-1 lg:px-2 justify-center bg-[#111827] font-bold rounded-sm border-b-2 border-white hover:border-blue-500 hover:text-blue-500 duration-300">
            SUBMIT CODE
          </button>
        </div>
      </div>
    </div>
  )
}

export default Runner
