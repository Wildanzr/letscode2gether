import { useState } from 'react'

import { Navbar, Footer } from '../../../layout'
import { Breadcrumb } from '../../../components/breadcrumb'
import { EditableListOfProblem } from '../../../components/table'
import { EditJourney } from '../../../components/form'

import { useParams } from 'react-router-dom'

const EditCompetesPage = () => {
  // useParams
  const { journeyId } = useParams()

  // Breadcrumb paths
  const [paths] = useState([
    {
      name: 'List of Learning Journeys',
      target: '/admin/manage/journeys'
    },
    {
      name: 'Edit Learning Journey',
      target: `/admin/manage/journeys/${journeyId}/edit`
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

          {/* Detail of Journey */}
          <div className="flex flex-col space-y-4 w-full font-ubuntu">
            <EditJourney>
              {/* List of Problems */}
              <div className="flex flex-col w-full space-y-2 overflow-y-auto">
                <div className="flex flex-col pb-4 overflow-y-auto">
                  <div className="flex w-full">
                    <EditableListOfProblem />
                  </div>
                </div>
              </div>
            </EditJourney>
          </div>
        </div>
      </Navbar>
      <Footer />
    </div>
  )
}

export default EditCompetesPage
