import { useState } from 'react'

import { Navbar, Footer } from '../../layout'
import { Breadcrumb } from '../../components/breadcrumb'
import { EditProblem } from '../../components/form'
import { EditableSampleCase, EditableTestCase } from '../../components/table'

import { useParams } from 'react-router-dom'

const EditProblemPage = () => {
  // useParams
  const { journeyId, problemId } = useParams()

  // Breadcrumb paths
  const [paths] = useState([
    {
      name: 'List of Learning Journeys',
      target: '/admin/manage/journeys'
    },
    {
      name: 'Edit Learning Journey',
      target: `/admin/manage/journeys/${journeyId}/edit`
    },
    {
      name: 'Edit Problem',
      target: `/admin/manage/journeys/${journeyId}/problems/${problemId}/edit`
    }
  ])

  // Local states
  // eslint-disable-next-line no-unused-vars
  const [sampleCases] = useState([
    {
      _id: '1',
      input: '5\n1 2 3 4 5',
      output: '2 1 4 3 5',
      explanation:
        'The output array is 2, 1, 4, 3, 5. If we look at the array, it is clearly in wave like array. We can verify that every even element is greater than its adjacent odd elements.'
    },
    {
      _id: '2',
      input: '6\n1 2 3 4 5 6',
      output: '2 1 4 3 6 5',
      explanation: null
    }
  ])
  const [testCases] = useState([
    {
      _id: '1',
      input: '5\n1 2 3 4 5',
      output: '2 1 4 3 5'
    },
    {
      _id: '2',
      input: '6\n1 2 3 4 5 6',
      output: '2 1 4 3 6 5'
    }
  ])
  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen space-y-14 bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <Navbar>
        <div className="flex flex-col w-11/12 space-y-6">
          {/* Header and Breadcrumb */}
          <div className="flex flex-col w-full">
            <h3 className="mb-0 font-ubuntu text-main dark:text-snow text-xl font-medium duration-300 ease-in-out">
              Learning Journey
            </h3>
            <Breadcrumb paths={paths} />
          </div>

          {/* Edit Problem */}
          <EditProblem>
            <div className="flex flex-col space-y-4 w-full font-ubuntu">
              <div className="flex flex-col w-full space-y-2">
                <p className="mb-0 font-medium text-base text-main dark:text-snow duration-300 ease-in-out">
                  Sample Cases
                </p>
                <EditableSampleCase sampleCases={sampleCases} />
              </div>

              <div className="flex flex-col w-full space-y-2">
                <p className="mb-0 font-medium text-base text-main dark:text-snow duration-300 ease-in-out">
                  Test Cases
                </p>
                <EditableTestCase testCases={testCases} />
              </div>
            </div>
          </EditProblem>
        </div>
      </Navbar>
      <Footer />
    </div>
  )
}

export default EditProblemPage
