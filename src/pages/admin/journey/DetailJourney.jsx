import { useState, useEffect } from 'react'
import { languageOptions } from '../../../constants/languageOptions'

import api from '../../../api'
import { Navbar, Footer } from '../../../layout'
import { Breadcrumb } from '../../../components/breadcrumb'
import { ListOfProblem } from '../../../components/table'
import { Description } from '../../../components/other'

import Cookies from 'js-cookie'
import { Skeleton, Tag } from 'antd'
import { useParams } from 'react-router-dom'

const DetailJourneyPage = () => {
  // useParams
  const { journeyId } = useParams()

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

  // Local states
  const [journeyDetail, setJourneyDetail] = useState(null)
  const [languageAllowed, setLanguageAllowed] = useState(null)

  // Get detail of journey
  const getDetailJourney = async () => {
    // Configuration
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get(`/competes/${journeyId}`, config)
      const { compete } = data.data

      setJourneyDetail(compete)
      setLanguageAllowed(transformLanguageAllowed(compete.languageAllowed))
    } catch (error) {
      console.log(error)
    }
  }

  // Transform language allowed
  const transformLanguageAllowed = (selected) => {
    const languageAllowed = languageOptions
      .filter(lang => selected.includes(lang.id))
      .map(lang => lang.label)

    return (
      <>
        {languageAllowed.map((lang, index) => (
          <Tag
            key={index}
            color="default"
            className='font-ubuntu font-medium'
          >
            <span className='text-easy'>
              {lang}
            </span>
          </Tag>
        ))}
      </>
    )
  }

  // Initial get detail of journey
  useEffect(() => {
    getDetailJourney()
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

          {/* Detail of Journey */}
          {
            journeyDetail
              ? (
              <div className="flex flex-col space-y-4 w-full font-ubuntu">
                <Description title="Name" value={journeyDetail.name} />
                <Description
                  title="Description"
                  value={journeyDetail.description}
                />
                <Description title="Language Allowed" value={languageAllowed} />
                <Description title="Problems" value="" />

                {/* List of Problems */}
                <div className="flex flex-col w-full space-y-2 overflow-y-auto">
                  <div className="flex flex-col pb-4 overflow-y-auto">
                    <div className="flex w-full">
                      <ListOfProblem />
                    </div>
                  </div>
                </div>
              </div>
                )
              : (
              <Skeleton
                active
                paragraph={{ rows: 4 }}
              />
                )
          }

        </div>
      </Navbar>

      <Footer />
    </div>
  )
}

export default DetailJourneyPage
