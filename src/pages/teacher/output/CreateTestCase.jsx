import langConfig from '../../../config/langConfig.json'
import { useState } from 'react'

import { Navbar, Footer } from '../../../layout'
import { Breadcrumb } from '../../../components/breadcrumb'
import { AddTest } from '../../../components/form'

import { useParams } from 'react-router-dom'

const CreateProblemTestCasePage = () => {
  // useParams
  const { journeyId, problemId } = useParams()

  // Breadcrumb paths
  const [paths] = useState([
    {
      name: langConfig.adminCompete1,
      target: '/teacher/manage/competes'
    },
    {
      name: langConfig.adminCompete2,
      target: `/teacher/manage/competes/${journeyId}/edit`
    },
    {
      name: langConfig.adminCompete5,
      target: `/teacher/manage/competes/${journeyId}/problems/${problemId}/edit`
    },
    {
      name: langConfig.adminCompete7,
      target: `/teacher/manage/competes/${journeyId}/problems/${problemId}/testcases/create`
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

          {/* Add Test Case */}
          <AddTest competes={true} />
        </div>
      </Navbar>

      <Footer />
    </div>
  )
}

export default CreateProblemTestCasePage
