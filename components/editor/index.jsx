import Dropdown from './Dropdown'
import TextEditor from './TextEditor'

import { languageOptions } from '../../constants/languageOptions'
import { useStateContext } from '../../contexts/ContextProvider'

const Editor = () => {
  // Get global state from ContextProvider
  const { editorStates } = useStateContext()

  const { setLanguage, setTheme } = editorStates

  const themes = [
    {
      id: 'vs',
      label: 'Light'
    },
    {
      id: 'vs-dark',
      label: 'Dark'
    }
  ]
  return (
    <>
      <div className="flex flex-row w-full gap-4 bg-[#4B5563] items-start justify-start">
        <Dropdown
          options={languageOptions}
          placeholder="Select Language"
          onChange={setLanguage}
        />
        <Dropdown
          options={themes}
          placeholder="Select Theme"
          onChange={setTheme}
        />
      </div>

      <div className="flex flex-col w-full h-[60vh]">
        <TextEditor />
      </div>
    </>
  )
}

export default Editor
