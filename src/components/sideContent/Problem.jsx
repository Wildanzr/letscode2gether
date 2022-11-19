import { useCollab } from '../../contexts/CollabContext'

import ProblemSpecification from './ProblemSpecification'
import SampleCase from './SampleCase'

import { Spin } from 'antd'

const Problem = () => {
  // Collab States
  const { problemStates } = useCollab()
  const { competeProblem } = problemStates

  return (
    <div className="flex flex-col w-full h-full space-y-4">
      <div className="flex flex-col w-full p-2">
        {competeProblem
          ? (
            <>
              <h4 className="mb-0 text-lg lg:text-2xl font-semibold text-white">
                {competeProblem.title}
              </h4>
              <p className="mb-0 text-sm font-thin text-white">
                Challenger: <span className="font-medium text-easy">
                {competeProblem.challenger.username}
                </span>
              </p>
            </>
            )
          : <Spin size='small' />
        }
      </div>

      <div className="flex flex-col w-full p-2">
        {competeProblem
          ? (
            <p className="text-sm text-justify text-white mb-0">
              {competeProblem.description}
            </p>
            )
          : <Spin size='small' />
        }
      </div>
      <div className="flex flex-col w-full bg-floor p-2">
        <ProblemSpecification title="Constraints">
          {competeProblem
            ? <p className="mb-0">{competeProblem.constraint}</p>
            : <Spin size='small' />
          }
        </ProblemSpecification>
      </div>

      <div className="flex flex-col w-full bg-floor p-2">
        <ProblemSpecification title="Input Format">
          {competeProblem
            ? <p className="mb-0">{competeProblem.inputFormat}</p>
            : <Spin size='small' />
          }
        </ProblemSpecification>
      </div>

      <div className="flex flex-col w-full bg-floor p-2">
        <ProblemSpecification title="Output Format">
          {competeProblem
            ? <p className="mb-0">{competeProblem.outputFormat}</p>
            : <Spin size='small' />
          }
        </ProblemSpecification>
      </div>

      {competeProblem
        ? (
            competeProblem.sampleCases.map((sample, index) => (
            <SampleCase key={index} title="Sample Case 1" {...sample} />
            ))
          )
        : <SampleCase title="Sample Case 1" input={null} output={null} />
      }

    </div>
  )
}

export default Problem
