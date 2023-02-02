import langConfig from '../../../config/langConfig.json'
import { useState, useEffect } from 'react'

import api from '../../../api'
import { Navbar, Footer } from '../../../layout'
import { Breadcrumb } from '../../../components/breadcrumb'
import { EditChallenge } from '../../../components/form'
import { EditableSampleCase, EditableTestCase } from '../../../components/table'

import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'

const EditChallengePage = () => {
  // useParams
  const { competeId, challengeId } = useParams()

  // Breadcrumb paths
  const [paths] = useState([
    {
      name: langConfig.adminChallenge1,
      target: '/admin/manage/challenges'
    },
    {
      name: langConfig.adminChallenge2,
      target: `/admin/manage/challenges/${competeId}/problems/${challengeId}/edit`
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
      const { data } = await api.get(`/problems/${challengeId}`, config)
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
              {langConfig.adminChallenge}
            </h3>
            <Breadcrumb paths={paths} />
          </div>

          {/* Edit Problem */}
          <EditChallenge problemDetail={problemDetail} setFetch={setFetch}>
            <div className="flex flex-col space-y-4 w-full font-ubuntu">
              <div className="flex flex-col w-full space-y-2">
                <p className="mb-0 font-medium text-base text-main dark:text-snow duration-300 ease-in-out">
                  {langConfig.problemDetailSampleCase}
                </p>
                <EditableSampleCase sampleCases={sampleCases} setFetch={setFetch} />
              </div>

              <div className="flex flex-col w-full space-y-2">
                <p className="mb-0 font-medium text-base text-main dark:text-snow duration-300 ease-in-out">
                 {langConfig.problemDetailTestCase}
                </p>
                <EditableTestCase testCases={testCases} setFetch={setFetch}/>
              </div>
            </div>
          </EditChallenge>
        </div>
      </Navbar>
      <Footer />
    </div>
  )
}

export default EditChallengePage
