import langConfig from '../../../config/langConfig.json'
import { useState, useEffect } from 'react'

import api from '../../../api'
import { Navbar, Footer } from '../../../layout'
import { Breadcrumb } from '../../../components/breadcrumb'
import { Description } from '../../../components/other'
import { SampleCaseDetail, TestCaseDetail } from '../../../components/table'

import Cookies from 'js-cookie'
import { Skeleton } from 'antd'
import { useParams, useSearchParams } from 'react-router-dom'

const DetailProblemPage = () => {
  // useParams
  const { journeyId, problemId } = useParams()

  // useSearchParams
  const [searchParams] = useSearchParams()
  const origin = searchParams.get('origin')

  // Breadcrumb paths
  const [paths] = useState(
    origin === 'edit'
      ? [
          {
            name: langConfig.adminLearningJourney1,
            target: '/admin/manage/journeys'
          },
          {
            name: langConfig.adminLearningJourney2a,
            target: `/admin/manage/journeys/${journeyId}/edit`
          },
          {
            name: langConfig.adminLearningJourney3,
            target: `/admin/manage/journeys/${journeyId}/problems/${problemId}?origin=edit`
          }
        ]
      : [
          {
            name: langConfig.adminLearningJourney1,
            target: '/admin/manage/journeys'
          },
          {
            name: langConfig.adminLearningJourney1,
            target: `/admin/manage/journeys/${journeyId}`
          },
          {
            name: langConfig.adminLearningJourney1,
            target: `/admin/manage/journeys/${journeyId}/problems/${problemId}?origin=detail`
          }
        ]
  )

  // eslint-disable-next-line no-unused-vars
  const [problemDetail, setProblemDetail] = useState(null)
  const [sampleCases, setSampleCases] = useState(null)
  const [testCases, setTestCases] = useState(null)

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
    getProblemDetail()
  }, [])
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

          {/* Detail of Problem */}
          {problemDetail
            ? (
              <div className="flex flex-col space-y-4 w-full font-ubuntu">
                <Description title={langConfig.problemDetailTitle} value={problemDetail.title} />
                <Description title={langConfig.problemDetailDescription} value={problemDetail.description} />
                <Description title={langConfig.problemDetailConstraints} value={problemDetail.constraint} />
                <Description
                  title={langConfig.problemDetailDifficulty}
                  value={
                    problemDetail.difficulty === 1
                      ? <span className='font-medium text-success'>{langConfig.challengeLevel1}</span>
                      : problemDetail.difficulty === 2
                        ? <span className='font-medium text-medium'>{langConfig.challengeLevel2}</span>
                        : <span className='font-medium text-hard'>{langConfig.challengeLevel3}</span>
                  }
                />
                <Description title={langConfig.problemDetailInputFormat} value={problemDetail.inputFormat} />
                <Description title={langConfig.problemDetailOutputFormat} value={problemDetail.outputFormat} />
                <Description title={langConfig.problemDetailSampleCase} value={null} />

                {/* Problem Sample Cases */}
                <div className="flex flex-col w-full space-y-2 overflow-y-auto">
                  <div className="flex flex-col pb-4 overflow-y-auto">
                    <div className="flex w-full">
                      <SampleCaseDetail sampleCases={sampleCases} />
                    </div>
                  </div>
                </div>

                <Description title="Test Cases" value={null} />

                {/* Problem Test Cases */}
                <div className="flex flex-col w-full space-y-2 overflow-y-auto">
                  <div className="flex flex-col pb-4 overflow-y-auto">
                    <div className="flex w-full">
                      <TestCaseDetail testCases={testCases} />
                    </div>
                  </div>
                </div>
              </div>
              )
            : <Skeleton
              active
              paragraph={{ rows: 10 }}
            />
          }

        </div>
      </Navbar>
      <Footer />
    </div>
  )
}

export default DetailProblemPage
