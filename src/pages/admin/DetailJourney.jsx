import { useState } from 'react'

import { Navbar, Footer } from '../../layout'
import { Breadcrumb } from '../../components/breadcrumb'
import { ListOfProblem } from '../../components/table'
import { Description } from '../../components/other'

import { useParams } from 'react-router-dom'

const DetailJourneyPage = () => {
  // useParams
  const { journeyId } = useParams()
  console.log(journeyId)

  // Breadcrumb paths
  const [paths] = useState([
    {
      name: 'List of Learning Journeys',
      target: '/admin/manage/journeys'
    },
    {
      name: 'Detail Learning Journey',
      target: `/admin/manage/journeys/${journeyId}`
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

        {/* Detail of Journey */}
        <div className="flex flex-col space-y-4 w-full font-ubuntu">
            <Description
                title="Name"
                value="Section 1 - Input Output"
            />
            <Description
                title="Description"
                value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet aliquet lacinia, nisl nisl aliquet nisl, eget aliquet nunc nisl eget nisl. Sed euismod, nunc sit amet aliquet lacinia, nisl nisl aliquet nisl, eget aliquet nunc nisl eget nisl."
            />
            <Description
                title="Language Allowed"
                value="C++"
            />
            <Description
                title="Problems"
                value=""
            />

            {/* List of Problems */}
            <div className="flex flex-col w-full space-y-2 overflow-y-auto">
              <div className="flex flex-col pb-4 overflow-y-auto">
                <div className="flex w-full">
                  <ListOfProblem />
                </div>
              </div>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default DetailJourneyPage
