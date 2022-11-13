import { useState } from 'react'

import { Navbar, Footer } from '../../layout'
import { Breadcrumb } from '../../components/breadcrumb'
import { Description } from '../../components/other'
import { SampleCaseDetail, TestCaseDetail } from '../../components/table'

import { useParams, useLocation } from 'react-router-dom'

const DetailProblemPage = () => {
  // useParams
  const { journeyId, problemId } = useParams()

  // useLocation
  const { pathname } = useLocation()
  const isInEditPage = pathname.includes('edit')

  // Breadcrumb paths
  const [paths] = useState(
    isInEditPage
      ? [
          {
            name: 'List of Learning Journeys',
            target: '/admin/manage/journeys'
          },
          {
            name: 'Edit Learning Journey',
            target: `/admin/manage/journeys/${journeyId}/edit`
          },
          {
            name: 'Detail Problem',
            target: `/admin/manage/journeys/${journeyId}/edit/problems/${problemId}`
          }
        ]
      : [
          {
            name: 'List of Learning Journeys',
            target: '/admin/manage/journeys'
          },
          {
            name: 'Detail Learning Journey',
            target: `/admin/manage/journeys/${journeyId}`
          },
          {
            name: 'Detail Problem',
            target: `/admin/manage/journeys/${journeyId}/problems/${problemId}`
          }
        ]
  )

  // eslint-disable-next-line no-unused-vars
  const [problemDetail, setProblemDetail] = useState({
    title: 'Wave Sort',
    description: 'Given an array of integers, sort the array into a wave like array and return it, In other words, arrange the elements into a sequence such that a1 >= a2 <= a3 >= a4 <= a5....',
    difficulty: 1,
    constraints: '1 <= N <= 10^5',
    inputFormat: 'First line contains an integer N. Second line contains N space separated integers.',
    outputFormat: 'Output the array in wave like array.',
    sampleCases: [
      {
        input: '5\n1 2 3 4 5',
        output: '2 1 4 3 5',
        explanation: 'The output array is 2, 1, 4, 3, 5. If we look at the array, it is clearly in wave like array. We can verify that every even element is greater than its adjacent odd elements.'
      },
      {
        input: '6\n1 2 3 4 5 6',
        output: '2 1 4 3 6 5',
        explanation: null
      }
    ],
    testCases: [
      {
        input: '5\n1 2 3 4 5',
        output: '2 1 4 3 5'
      },
      {
        input: '6\n1 2 3 4 5 6',
        output: '2 1 4 3 6 5'
      }
    ]
  })
  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen space-y-14 bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <Navbar />
      <div className="flex flex-col w-11/12 space-y-6">
        {/* Header and Breadcrumb */}
        <div className="flex flex-col w-full">
          <h3 className="mb-0 font-ubuntu text-main dark:text-snow text-xl font-medium duration-300 ease-in-out">
            Learning Journey
          </h3>
          <Breadcrumb paths={paths} />
        </div>

        {/* Detail of Problem */}
        <div className="flex flex-col space-y-4 w-full font-ubuntu">
            <Description
                title="Title"
                value={problemDetail.title}
            />
            <Description
                title="Description"
                value={problemDetail.description}
            />
            <Description
                title="Constraints"
                value={problemDetail.constraints}
            />
            <Description
                title="Input Format"
                value={problemDetail.inputFormat}
            />
            <Description
                title="Output Format"
                value={problemDetail.outputFormat}
            />

            <Description
              title="Sample Cases"
              value={null}
            />

            {/* Problem Sample Cases */}
            <div className="flex flex-col w-full space-y-2 overflow-y-auto">
              <div className="flex flex-col pb-4 overflow-y-auto">
                <div className="flex w-full">
                  <SampleCaseDetail sampleCases={problemDetail.sampleCases} />
                </div>
              </div>
            </div>

            <Description
              title="Test Cases"
              value={null}
            />

            {/* Problem Test Cases */}
            <div className="flex flex-col w-full space-y-2 overflow-y-auto">
              <div className="flex flex-col pb-4 overflow-y-auto">
                <div className="flex w-full">
                  <TestCaseDetail testCases={problemDetail.testCases} />
                </div>
              </div>
            </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default DetailProblemPage
