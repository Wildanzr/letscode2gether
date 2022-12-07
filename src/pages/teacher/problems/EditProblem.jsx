import { useState, useEffect } from 'react'

import api from '../../../api'
import { Navbar, Footer } from '../../../layout'
import { Breadcrumb } from '../../../components/breadcrumb'
import { EditProblem } from '../../../components/form'
import { EditableSampleCase, EditableTestCase } from '../../../components/table'

import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'

const EditCompeteProblemPage = () => {
  // useParams
  const { journeyId, problemId } = useParams()

  // Breadcrumb paths
  const [paths] = useState([
    {
      name: 'List of Competes',
      target: '/teacher/manage/competes'
    },
    {
      name: 'Edit Compete',
      target: `/teacher/manage/competes/${journeyId}/edit`
    },
    {
      name: 'Edit Problem',
      target: `/teacher/manage/competes/${journeyId}/problems/${problemId}/edit`
    }
  ])

  // Local states
  const [problemDetail, setProblemDetail] = useState(null)
  const [sampleCases, setSampleCases] = useState(null)
  const [testCases, setTestCases] = useState(null)
  const [fetch, setFetch] = useState(true)

  // Get problem detail
  const getProblemDetail = async () => {
    // Configuration
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    // Get problem detail
    try {
      const { data } = await api.get(`/problems/${problemId}`, config)
      // console.log(data.data.problem)
      setProblemDetail(data.data.problem)
      setSampleCases(data.data.problem.sampleCases)
      setTestCases(data.data.problem.testCases)
    } catch (error) {
      console.log(error)
    }
  }

  // Initial get problem detail
  useEffect(() => {
    if (fetch) {
      getProblemDetail()
      setFetch(false)
    }
  }, [fetch])
  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen space-y-14 bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <Navbar>
        <div className="flex flex-col w-11/12 space-y-6">
          {/* Header and Breadcrumb */}
          <div className="flex flex-col w-full">
            <h3 className="mb-0 font-ubuntu text-main dark:text-snow text-xl font-medium duration-300 ease-in-out">
              Competes
            </h3>
            <Breadcrumb paths={paths} />
          </div>

          {/* Edit Problem */}
          <EditProblem problemDetail={problemDetail} setFetch={setFetch} competes={true} >
            <div className="flex flex-col space-y-4 w-full font-ubuntu">
              <div className="flex flex-col w-full space-y-2">
                <p className="mb-0 font-medium text-base text-main dark:text-snow duration-300 ease-in-out">
                  Sample Cases
                </p>
                <EditableSampleCase sampleCases={sampleCases} setFetch={setFetch} competes={true}/>
              </div>

              <div className="flex flex-col w-full space-y-2">
                <p className="mb-0 font-medium text-base text-main dark:text-snow duration-300 ease-in-out">
                  Test Cases
                </p>
                <EditableTestCase testCases={testCases} setFetch={setFetch} competes={true}/>
              </div>
            </div>
          </EditProblem>
        </div>
      </Navbar>
      <Footer />
    </div>
  )
}

export default EditCompeteProblemPage
