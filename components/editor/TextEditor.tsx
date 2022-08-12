import Editor from '@monaco-editor/react'

const TextEditor = () => {
  return (
    <Editor
          height={'100%'}
          width={'100%'}
          language={'javascript'}
          value={'code'}
          theme={'vs-dark'}
          defaultValue="// some comment"
          onChange={() => console.log('changed')}
        />
  )
}

export default TextEditor
