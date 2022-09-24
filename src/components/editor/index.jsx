import { useEffect } from 'react'

import Dropdown from './Dropdown'
import TextEditor from './TextEditor'

import { languageOptions } from '../../constants/languageOptions'
import { useGlobalContext } from '../../contexts/GlobalContext'

import { themeList } from '../../constants/themeList'
import { defineTheme } from '../../libs/defineTheme'
import { themeDropDown } from '../../constants/themeDropdown'

const Editor = () => {
  // Get global state from ContextProvider
  const { editorState } = useGlobalContext()
  const { setLanguage, setTheme } = editorState

  const handleLanguageChange = async (value) => {
    console.log('theme...', value)
    const theme = value

    setTheme(value)
    await defineTheme(theme)
  }

  // Change theme
  useEffect(() => {
    themeList.forEach(async (theme) => {
      await defineTheme(theme)
    })
    // defineTheme('active4d')
    // defineTheme('all-hallows-eve')
    // defineTheme('amy')
    // defineTheme('birds-of-paradise')
    // defineTheme('blackboard')
    // defineTheme('brilliance-black')
    // defineTheme('brilliance-dull')
    // defineTheme('chrome-devtools')
    // defineTheme('clouds-midnight')
    // defineTheme('clouds')
    // defineTheme('cobalt')
    // defineTheme('dawn')
    // defineTheme('dreamweaver')
    // defineTheme('eiffel')
    // defineTheme('espresso-libre')
    // defineTheme('github')
    // defineTheme('idle')
    // defineTheme('katzenmilch')
    // defineTheme('kuroir-theme')
    // defineTheme('lazy')
    // defineTheme('magicwb--amiga-')
    // defineTheme('merbivore-soft')
    // defineTheme('merbivore')
    // defineTheme('monokai-bright')
    // defineTheme('monokai')
    // defineTheme('night-owl')
    // defineTheme('oceanic-next')
    // defineTheme('pastels-on-dark')
    // defineTheme('slush-and-poppies')
    // defineTheme('solarized-dark')
    // defineTheme('solarized-light')
    // defineTheme('spacecadet')
    // defineTheme('sunburst')
    // defineTheme('textmate--mac-classic-')
    // defineTheme('tomorrow-night-blue')
    // defineTheme('tomorrow-night-bright')
    // defineTheme('tomorrow-night-eighties')
    // defineTheme('tomorrow-night')
    // defineTheme('tomorrow')
    // defineTheme('twilight')
    // defineTheme('upstream-sunburst')
    // defineTheme('vibrant-ink')
    // defineTheme('xcode-default')
    // defineTheme('zenburnesque')
    // defineTheme('iplastic')
    // defineTheme('idlefingers')
    // defineTheme('krtheme')
    // defineTheme('monoindustrial')
  }, [])

  return (
    <>
      <div className="flex flex-row w-full space-x-4 items-start justify-start">
        <Dropdown
          options={languageOptions}
          placeholder="Select Language"
          onChange={setLanguage}
        />
        <Dropdown
          options={themeDropDown}
          placeholder="Select Theme"
          onChange={handleLanguageChange}
        />
      </div>

      <div className="flex flex-col w-full h-[60vh]">
        <TextEditor />
      </div>
    </>
  )
}

export default Editor
