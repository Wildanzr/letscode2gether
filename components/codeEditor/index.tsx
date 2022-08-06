import { useState } from 'react'

import { useStateContext } from '../../contexts/ContextProvider'

import Editor from '@monaco-editor/react'
import SelectLanguage from './SelectLanguage'
import SelectTheme from './SelectTheme'

interface CodeEditorProps {
  onChange: Function;
  language: string;
  code: string;
  theme: any;
}

const CodeEditor = (props: CodeEditorProps) => {
  const { onChange, language, code, theme } = props

  // Get global state from ContextProvider
  const { states }:any = useStateContext()
  const { colOutputHide } = states

  const handleEditorChange = (value: any) => {
    setValue(value)
    onChange('code', value)
  }
  const [value, setValue] = useState(code || '')
  return (
    <div className={`flex flex-col ${colOutputHide ? 'h-[100%]' : 'h-full'} w-full items-start justify-start transition-all ease-in-out duration-500 z-40`}>
      <div className='flex flex-row w-full my-2 px-5 justify-start'>
        <div className="flex w-2/12 mr-2">
          <SelectLanguage />
        </div>
        <div className="flex w-2/12 ml-2">
          <SelectTheme />
        </div>
      </div>
      <div className="overlay overflow-hidden w-full h-full shadow-4xl">
        <Editor
          height={'100%'}
          width={'100%'}
          language={language || 'javascript'}
          value={value}
          theme={theme}
          defaultValue="// some comment"
          onChange={handleEditorChange}
        />
      </div>
    </div>
  )
}

export default CodeEditor
