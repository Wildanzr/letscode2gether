import { useGlobal } from '../../contexts/GlobalContext'

import TestCaseResult from './TestCaseResult'

import { Collapse, Tag } from 'antd'
import Editor from '@monaco-editor/react'

const { Panel } = Collapse

const Submission = () => {
  // Global States
  const { editorState } = useGlobal()
  const { theme } = editorState

  return (
    <div className="flex flex-col w-full h-full space-y-4">
      <div className="flex flex-col w-full">
        <h4 className="mb-0 text-lg lg:text-2xl font-semibold text-white">
          Program Mengeja Angka 1 Hingga 100
        </h4>
        <p className="mb-0 text-sm font-thin text-white">
          Challenger: <span className="font-semibold">meowwed</span>
        </p>
      </div>

      <div className="flex flex-col w-full">
        <Collapse
          bordered={false}
          defaultActiveKey={['1']}
          expandIconPosition={'end'}
          accordion
        >
          <Panel
            header={<p className="font-bold text-white mb-0">Submission #3</p>}
            key="3"
            className="bg-[#4B5563] text-white"
          >
            <div className="flex flex-row w-full pb-0">
            <p className="mb-0 pr-2 font-semibold text-white">Score:</p>
              <Tag color="blue" className="font-semibold">
                100
              </Tag>
            </div>

            <div className="flex flex-col w-full h-full">
              <TestCaseResult />
              <p className="mb-2 text-white">Source Code:</p>
              <div className="flex flex-col w-full h-40">
                <Editor
                  height={'100%'}
                  width={'100%'}
                  language={''}
                  theme={theme}
                  defaultValue="// Lets solve this problem!"
                  options={{ readOnly: true }}
                />
              </div>
            </div>
          </Panel>
        </Collapse>
      </div>
    </div>
  )
}

export default Submission
