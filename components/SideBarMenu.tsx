import { useStateContext } from '../contexts/ContextProvider'

import { Button } from 'antd'

const SideBarMenu = () => {
  // Get global state
  const { states }: any = useStateContext()

  // Destructure global state
  const {
    colSideHide,
    setColSideHide,
    setColSideContent,
    colSideKey,
    setColSideKey,
    colOutputHide,
    setColOutputHide
  } = states

  const handleChange = (origin: string) => {
    if (colSideHide) {
      setColSideHide(!colSideHide)
    } else if (colSideKey === origin) {
      setColSideHide(!colSideHide)
    }

    setColSideKey(origin)
    switch (origin) {
      case 'problems':
        setColSideContent('Problems')
        break
      case 'submissions':
        setColSideContent('Submissions')
        break
      case 'leaderboards':
        setColSideContent('Leaderboards')
        break
      default:
        setColSideContent('Problems')
    }
  }
  return (
    <div className="flex flex-col w-full h-5/6 bg-green-400 items-center justify-start py-5">
      <Button
        type="primary"
        onClick={() => handleChange('problems')}
        className="flex w-full my-4"
      >
        Problems
      </Button>
      <Button
        type="primary"
        onClick={() => handleChange('submissions')}
        className="flex w-full my-4"
      >
        Submissions
      </Button>
      <Button
        type="primary"
        onClick={() => handleChange('leaderboards')}
        className="flex w-full my-4"
      >
        Leaderboards
      </Button>
      <Button
        type="primary"
        onClick={() => setColOutputHide(!colOutputHide)}
        className="flex w-full my-4"
      >
        Output
      </Button>
    </div>
  )
}

export default SideBarMenu
