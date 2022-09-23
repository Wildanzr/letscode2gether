import Dropdown from './Dropdown'
import TextEditor from './TextEditor'

const Editor = () => {
  return (
    <>
      <div className="flex flex-row w-full gap-4 bg-[#4B5563] items-start justify-start">
        <Dropdown />
        <Dropdown />
      </div>

      <div className="flex flex-col w-full h-[60vh]">
        <TextEditor />
      </div>
    </>
  )
}

export default Editor
