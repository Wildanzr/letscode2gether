import langConfig from '../../../config/langConfig.json'
import { useState } from 'react'

import { Navbar, Footer } from '../../../layout'
import { Breadcrumb } from '../../../components/breadcrumb'
import { EditableListOfCompeteProblem } from '../../../components/table'
import { EditCompete } from '../../../components/form'

import { useParams } from 'react-router-dom'

const EditCompetesPage = () => {
  // useParams
  const { journeyId } = useParams()

  // Breadcrumb paths
  const [paths] = useState([
    {
      name: langConfig.adminCompete1,
      target: '/teacher/manage/competes'
    },
    {
      name: langConfig.adminCompete2,
      target: `/teacher/manage/competes/${journeyId}/edit`
    }
  ])

  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen space-y-14 bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <Navbar>
        <div className="flex flex-col w-11/12 space-y-6">
          {/* Header and Breadcrumb */}
          <div className="flex flex-col w-full">
            <h3 className="mb-0 font-ubuntu text-main dark:text-snow text-xl font-medium duration-300 ease-in-out">
              {langConfig.adminCompete}
            </h3>
            <Breadcrumb paths={paths} />
          </div>

          {/* Detail of Journey */}
          <div className="flex flex-col space-y-4 w-full font-ubuntu">
            <EditCompete>
              {/* List of Problems */}
              <div className="flex flex-col w-full space-y-2 overflow-y-auto">
                <div className="flex flex-col pb-4 overflow-y-auto">
                  <div className="flex w-full">
                    <EditableListOfCompeteProblem competes={true} />
                  </div>
                </div>
              </div>
            </EditCompete>
          </div>
        </div>
      </Navbar>
      <Footer />
    </div>
  )
}

export default EditCompetesPage
