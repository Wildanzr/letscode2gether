import langConfig from '../../../config/langConfig.json'
import { useState } from 'react'

import { Navbar, Footer } from '../../../layout'
import { Breadcrumb } from '../../../components/breadcrumb'
import { AddChallenge } from '../../../components/form'

import { useParams } from 'react-router-dom'

const CreateChallengePage = () => {
  // useParams
  const { journeyId } = useParams()

  // Breadcrumb paths
  const [paths] = useState([
    {
      name: langConfig.adminChallenge1,
      target: '/admin/manage/challenges'
    },
    {
      name: langConfig.adminChallenge1a,
      target: `/admin/manage/challenges/${journeyId}/problems/create`
    }
  ])
  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen space-y-14 bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <Navbar>
        <div className="flex flex-col w-11/12 space-y-6">
          {/* Header and Breadcrumb */}
          <div className="flex flex-col w-full">
            <h3 className="mb-0 font-ubuntu text-main dark:text-snow text-xl font-medium duration-300 ease-in-out">
              {langConfig.adminChallenge}
            </h3>
            <Breadcrumb paths={paths} />
          </div>

          {/* Create Problem */}
          <AddChallenge />
        </div>
      </Navbar>
      <Footer />
    </div>
  )
}

export default CreateChallengePage
