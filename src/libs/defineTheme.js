import { loader } from '@monaco-editor/react'

import { themeData } from '../constants/themeData'

const defineTheme = async (theme) => {
  return new Promise((resolve) => {
    Promise.all([
      loader.init()
    ]).then(([monaco]) => {
      monaco.editor.defineTheme(theme, themeData[theme])
      resolve()
    })
  })
}

export { defineTheme }
