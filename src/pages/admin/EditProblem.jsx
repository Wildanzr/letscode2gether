import { useState } from 'react'

import { Navbar, Footer } from '../../layout'
import { Breadcrumb } from '../../components/breadcrumb'
import { EditProblem } from '../../components/form'
import { EditableSampleCase } from '../../components/table'

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
      target: `/admin/manage/journeys/${journeyId}/edit/problems/${problemId}/edit`
    }
  ])

  // Local states
  // eslint-disable-next-line no-unused-vars
  const [problems, setProblems] = useState([
    {
      _id: 1,
      name: 'Hello World',
      difficulty: 1
    },
    {
      _id: 2,
      name: 'Greeting Morning',
      difficulty: 2
    },
    {
      _id: 3,
      name: 'Let Me Introduce MySelf',
      difficulty: 3
    }
  ])
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

        {/* Edit Problem */}
        <div className="flex flex-col space-y-4 w-full font-ubuntu">
          <EditProblem />
        </div>

        <EditableSampleCase />
      </div>
      <Footer />
    </div>
  )
}

export default EditProblemPage
