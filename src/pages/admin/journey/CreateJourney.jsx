import { useState } from 'react'

import { Navbar, Footer } from '../../../layout'
import { Breadcrumb } from '../../../components/breadcrumb'
import { AddJourney } from '../../../components/form'

const CreateJourneyPage = () => {
  // Breadcrumb paths
  const [paths] = useState([
    {
      name: 'List of Learning Journeys',
      target: '/admin/manage/journeys'
    },
    {
      name: 'Create Learning Journey',
      target: '/admin/manage/journeys/create'
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

          {/* Create Journey */}
          <div className="flex flex-col space-y-4 w-full font-ubuntu">
            <AddJourney />
          </div>
        </div>
      </Navbar>
      <Footer />
    </div>
  )
}

export default CreateJourneyPage
