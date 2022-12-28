import langConfig from '../../config/langConfig.json'
import { useCollab } from '../../contexts/CollabContext'

import ProblemSpecification from './ProblemSpecification'
import SampleCase from './SampleCase'

import { Spin } from 'antd'

const Problem = () => {
  // Collab States
  const { problemStates } = useCollab()
  const { competeProblem } = problemStates

  const formatOutput = (str) => {
    const formatted = str.replace(/\^/g, '\n')

    return (
      <>
        {formatted.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </>
    )
  }

  return (
    <div className="flex flex-col w-full h-full space-y-4 text-main dark:text-snow duration-300 ease-in-out">
      <div className="flex flex-col w-full">
        {competeProblem
          ? (
            <p className="text-sm text-justify mb-0">
              {competeProblem.description}
            </p>
            )
          : <Spin size='small' />
        }
      </div>
      <div className="flex flex-col w-full p-2 bg-white text-black">
        <ProblemSpecification title={langConfig.problemConstraints}>
          {competeProblem
            ? <p className="mb-0">{formatOutput(competeProblem.constraint)}</p>
            : <Spin size='small' />
          }
        </ProblemSpecification>
      </div>

      <div className="flex flex-col w-full p-2 bg-white text-black">
        <ProblemSpecification title={langConfig.problemInputFormat}>
          {competeProblem
            ? <p className="mb-0">{formatOutput(competeProblem.inputFormat)}</p>
            : <Spin size='small' />
          }
        </ProblemSpecification>
      </div>

      <div className="flex flex-col w-full p-2 bg-white text-black">
        <ProblemSpecification title={langConfig.problemOutputFormat}>
          {competeProblem
            ? <p className="mb-0">{formatOutput(competeProblem.outputFormat)}</p>
            : <Spin size='small' />
          }
        </ProblemSpecification>
      </div>

      {competeProblem
        ? (
            competeProblem.sampleCases.map((sample, index) => (
            <SampleCase key={index} title={`${langConfig.problemSampleCase} ${index + 1}`} {...sample} />
            ))
          )
        : <SampleCase title={`${langConfig.problemSampleCase} 1`} input={null} output={null} />
      }

    </div>
  )
}

export default Problem
