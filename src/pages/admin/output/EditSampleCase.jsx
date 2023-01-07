import langConfig from '../../../config/langConfig.json'
import { useState } from 'react'

import { Navbar, Footer } from '../../../layout'
import { Breadcrumb } from '../../../components/breadcrumb'
import { EditSample } from '../../../components/form'

import { useParams } from 'react-router-dom'

const EditSampleCasePage = () => {
  // useParams
  const { journeyId, problemId, competeId, challengeId, sampleId } = useParams()

  // Breadcrumb paths
  const [paths] = useState(
    journeyId === undefined
      ? [
          {
            name: langConfig.adminChallenge1,
            target: '/admin/manage/challenges'
          },
          {
            name: langConfig.adminChallenge2,
            target: `/admin/manage/challenges/${competeId}/problems/${challengeId}/edit`
          },
          {
            name: langConfig.adminChallenge6,
            target: `/admin/manage/challenges/${competeId}/problems/${challengeId}/samplecases/edit`
          }
        ]
      : [
          {
            name: langConfig.adminLearningJourney1,
            target: '/admin/manage/journeys'
          },
          {
            name: langConfig.adminLearningJourney2a,
            target: `/admin/manage/journeys/${journeyId}/edit`
          },
          {
            name: langConfig.adminLearningJourney4,
            target: `/admin/manage/journeys/${journeyId}/problems/${problemId}/edit`
          },
          {
            name: langConfig.adminLearningJourney7,
            target: `/admin/manage/journeys/${journeyId}/problems/${problemId}/samplecases/${sampleId}/edit`
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
              {journeyId === undefined
                ? langConfig.adminChallenge
                : langConfig.adminJourney
              }
            </h3>
            <Breadcrumb paths={paths} />
          </div>

          {/* Edit Sample Case */}
          <EditSample />
        </div>
      </Navbar>

      <Footer />
    </div>
  )
}

export default EditSampleCasePage
