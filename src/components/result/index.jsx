import { useEffect, useState } from 'react'

import Testcase from './Testcase'
import Skeleton from './Skeleton'

import { Tabs } from 'antd'

const Result = () => {
  const [delay, setDelay] = useState(3000)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelay(0)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    delay
      ? (
      <Skeleton />
        )
      : (
      <div className={'flex w-full overflow-x-auto bg-[#1F2937]'}>
      <Tabs
        type="card"
        className="w-full"
        items={[
          {
            key: '1',
            label: 'Testcase 1',
            children: <Testcase />
          },
          {
            key: '2',
            label: 'Testcase 2',
            children: <Testcase />
          },
          {
            key: '3',
            label: 'Testcase 3',
            children: <Testcase />
          },
          {
            key: '4',
            label: 'Testcase 4',
            children: <Testcase />
          }
        ]}
      />
    </div>
        )
  )
}

export default Result
