import langConfig from '../../config/langConfig.json'
import SubmissionDetail from './SubmissionDetail'

import { Collapse } from 'antd'

const { Panel } = Collapse

const SubmissionList = (props) => {
  // Props Destructure
  const { submissions } = props

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      expandIconPosition={'end'}
      accordion
      className="w-full"
    >
      {submissions.slice(0).reverse().map((submission, index) => (
        <Panel
          header={<p className="font-bold text-white mb-0">{langConfig.submissionName} #{submissions.length - index}</p>}
          key={index + 1}
          className="bg-floor text-white"
        >
          <SubmissionDetail submissionId={submission}/>
        </Panel>
      ))}
    </Collapse>
  )
}

export default SubmissionList
