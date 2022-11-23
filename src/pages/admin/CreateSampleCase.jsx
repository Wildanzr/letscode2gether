import { useState } from 'react'

import { Navbar, Footer } from '../../layout'
import { Breadcrumb } from '../../components/breadcrumb'
import { AddSample } from '../../components/form'

import { useParams } from 'react-router-dom'

const CreateSampleCasePage = () => {
  // useParams
  const { journeyId, problemId, competeId, challengeId } = useParams()

  // Breadcrumb paths
  const [paths] = useState(journeyId === undefined
    ? [
        {
          name: 'List of Challenges',
          target: '/admin/manage/challenges'
        },
        {
          name: 'Edit Challenge',
          target: `/admin/manage/challenges/${competeId}/problems/${challengeId}/edit`
        },
        {
          name: 'Add Sample Case',
          target: `/admin/manage/challenges/${competeId}/problems/${challengeId}/samplecases/create`
        }
      ]
    : [
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
        },
        {
          name: 'Add Sample Case',
          target: `/admin/manage/journeys/${journeyId}/problems/${problemId}/samplecases/create`
        }
      ]
  )

  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen space-y-14 bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <Navbar>
        <div className="flex flex-col w-11/12 space-y-6">
          {/* Header and Breadcrumb */}
          <div className="flex flex-col w-full">
            <h3 className="mb-0 font-ubuntu text-main dark:text-snow text-xl font-medium duration-300 ease-in-out">
              {journeyId === undefined ? 'Challenges' : 'Learning Journey'}
            </h3>
            <Breadcrumb paths={paths} />
          </div>

          {/* Add Sample Case */}
          <AddSample />
        </div>
      </Navbar>

      <Footer />
    </div>
  )
}

export default CreateSampleCasePage
