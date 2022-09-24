import { Collapse, Tag } from 'antd'
import Editor from '@monaco-editor/react'

import { languageOptions } from '../../constants/languageOptions'
import TestCaseResult from './TestCaseResult'

const { Panel } = Collapse

const Submission = () => {
  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="flex flex-col w-full">
        <h4 className="mb-0 text-lg lg:text-2xl font-semibold ">
          Program Mengeja Angka 1 Hingga 100
        </h4>
        <p className="mb-0 text-sm font-thin">
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
            header={<p className="font-bold">Submission #1</p>}
            key="1"
            className="py-2"
          >
            <div className="flex flex-row w-full pb-0">
              <p className="mb-0 pr-2 font-semi">Score:</p>
              <Tag color="blue" className="font-semibold">
                100
              </Tag>
            </div>

            <div className="flex flex-col w-full h-full">
              <TestCaseResult />
              <p className="mb-2">Source Code:</p>
              <div className="flex flex-col w-full h-40">
                <Editor
                  height={'100%'}
                  width={'100%'}
                  language={''}
                  value={languageOptions[25].template}
                  theme={'vs'}
                  defaultValue="// Lets solve this problem!"
                  onChange={() => console.log('changed')}
                />
              </div>
            </div>
          </Panel>
          <Panel
            header={<p className="font-bold">Submission #2</p>}
            key="2"
            className="py-2"
          >
            <div className="flex flex-row w-full pb-0">
              <p className="mb-0 pr-2 font-semi">Score:</p>
              <Tag color="blue" className="font-semibold">
                100
              </Tag>
            </div>

            <div className="flex flex-col w-full h-full">
              <TestCaseResult />
              <p className="mb-2">Source Code:</p>
              <div className="flex flex-col w-full h-40">
                <Editor
                  height={'100%'}
                  width={'100%'}
                  language={''}
                  value={languageOptions[25].template}
                  theme={'vs'}
                  defaultValue="// Lets solve this problem!"
                  onChange={() => console.log('changed')}
                />
              </div>
            </div>
          </Panel>
          <Panel
            header={<p className="font-bold">Submission #3</p>}
            key="3"
            className="py-2"
          >
            <div className="flex flex-row w-full pb-0">
              <p className="mb-0 pr-2 font-semi">Score:</p>
              <Tag color="blue" className="font-semibold">
                100
              </Tag>
            </div>

            <div className="flex flex-col w-full h-full">
              <TestCaseResult />
              <p className="mb-2">Source Code:</p>
              <div className="flex flex-col w-full h-40">
                <Editor
                  height={'100%'}
                  width={'100%'}
                  language={''}
                  value={languageOptions[25].template}
                  theme={'vs'}
                  defaultValue="// Lets solve this problem!"
                  onChange={() => console.log('changed')}
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
