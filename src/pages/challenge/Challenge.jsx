import langConfig from '../../config/langConfig.json'

import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import ChallengePic from '../../assets/challenge.svg'

import api from '../../api'
import { Navbar, Footer } from '../../layout'
import { Challenge } from '../../components/card'

import debounce from 'lodash.debounce'
import Cookies from 'js-cookie'
import { RiSearchLine } from 'react-icons/ri'
import { Input, Pagination, Skeleton } from 'antd'

const { Search } = Input

const ChallengePage = () => {
  // Auth States and Functions
  const { authStates, authFunctions } = useAuth()
  const { user } = authStates
  const { travelLog } = authFunctions

  // Local states
  const [competeId, setCompeteId] = useState(null)
  const [problems, setProblems] = useState(null)
  const [firstFetch, setFirstFetch] = useState(true)
  const [secondFetch, setSecondFetch] = useState(false)
  const [from] = useState(new Date())
  // const options = [
  //   {
  //     value: 'level',
  //     label: 'Level',
  //     children: [
  //       {
  //         value: 'easy',
  //         label: 'Easy'
  //       },
  //       {
  //         value: 'medium',
  //         label: 'Medium'
  //       },
  //       {
  //         value: 'hard',
  //         label: 'Hard'
  //       }
  //     ]
  //   },
  //   {
  //     value: 'solved',
  //     label: 'Solved'
  //   },
  //   {
  //     value: 'solve',
  //     label: 'Waiting to Solve'
  //   }
  // ]

  // Pagination states
  const [search, setSearch] = useState('')
  const [defaultCurrent, setDefaultCurrent] = useState(1)
  const [total, setTotal] = useState(10)
  const [limit, setLimit] = useState(10)

  // Handle cascader change
  // const handleCascaderChange = (value) => {
  //   console.log(value)
  // }

  // Handle pagination change
  const onShowSizeChange = (current, pageSize) => {
    setDefaultCurrent(current)
    setLimit(pageSize)
    setSecondFetch(true)
  }

  const fetchJourneys = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }
    try {
      const { data } = await api.get('/competes?page=1&limit=10&isChallenge=true', config)
      // console.log(data)

      const { competes } = data.data

      if (competes.length === 0) {
        setProblems([])
      } else {
        setCompeteId(competes[0]._id)
        setSecondFetch(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Search problems
  const searchProblem = async () => {
    // Set problems to null
    setProblems(null)

    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get(`/competes/${competeId}/challenges?q=${search}&page=${defaultCurrent}&limit=${limit}`, config)
      // console.log(data)

      // Set problems
      const { problems } = data.data
      setProblems(problems)
      // console.log(problems)

      // Set meta
      const { page, total } = data.meta
      setDefaultCurrent(parseInt(page))
      setTotal(parseInt(total))
    } catch (error) {
      console.log(error)
    }
  }

  // Handle search change
  const handleSearch = (e) => {
    setProblems(null)
    const query = e.target.value
    setSearch(query)
    setSecondFetch(true)
  }

  // Initial fetch challenge journey
  useEffect(() => {
    if (firstFetch) {
      fetchJourneys()
      setFirstFetch(false)
    }
  }, [firstFetch])

  // Search problems when total or defaultCurrent changed
  useEffect(() => {
    if (secondFetch) {
      searchProblem()
      setSecondFetch(false)
    }
  }, [total, defaultCurrent, secondFetch])

  // UseEffect when leaving page
  useEffect(() => {
    return () => {
      if (user) travelLog('Visiting challenge page', from, new Date())
    }
  }, [user])
  return (
    <div className="flex flex-col w-full min-h-screen justify-between space-y-14 bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <Navbar />

      {/* Header */}
      <div className="flex px-[5%] flex-col lg:flex-row-reverse w-full items-center justify-center lg:justify-between">
        <div className="flex w-full lg:w-1/3 items-center justify-center">
          <img src={ChallengePic} className="flex w-[60%]" />
        </div>

        <div className="flex w-full lg:w-2/3 items-center justify-center">
          <div className="flex flex-col w-full space-y-4 lg:space-y-8 items-center lg:items-start">
            <p className="text-3xl text-center lg:text-left mb-0 lg:text-5xl font-ubuntu font-medium">
              {langConfig.userNav2}
            </p>
            <p className="flex lg:hidden font-ubuntu text-base lg:text-lg text-center lg:text-left">
              {langConfig.challengeDesc}
            </p>
            <p className="hidden lg:flex font-ubuntu text-base lg:text-lg text-center lg:text-left">
              {langConfig.challengeDesc}
            </p>
          </div>
        </div>
      </div>

      {/* List Controller */}
      <div className="flex flex-col m-0 px-[5%] space-y-5 lg:pt-0 w-full items-center justify-between">
        <div className="w-full hidden lg:flex">
          <Search
            placeholder={langConfig.challengeSearch}
            prefix={<RiSearchLine />}
            allowClear
            onChange={debounce(handleSearch, 500)}
            enterButton={langConfig.challengeSearchButton}
          />
        </div>

        <div className="w-full hidden flex-row justify-end lg:flex">
          <Pagination
            onChange={onShowSizeChange}
            showSizeChanger
            defaultCurrent={defaultCurrent}
            total={total}
            locale={{ items_per_page: ' / halaman' }}
          />
        </div>

        <div className="flex flex-row lg:hidden w-full space-x-5">
          <Search
            placeholder={langConfig.challengeSearch}
            prefix={<RiSearchLine />}
            allowClear
            onChange={debounce(handleSearch, 500)}
            enterButton={langConfig.challengeSearchButton}
          />
        </div>
        <div className="w-full flex flex-row justify-center lg:hidden">
          <Pagination
            onChange={onShowSizeChange}
            defaultCurrent={defaultCurrent}
            total={total}
            locale={{ items_per_page: ' / halaman' }}
          />
        </div>
      </div>

      {/* Challenges */}
      <div className="flex flex-col m-0 px-[5%] pb-10 space-y-5 lg:pt-0 w-full items-center justify-center">
        {problems === null
          ? <Skeleton active paragraph={{ rows: 4 }} />
          : problems.length === 0
            ? <p className="text-2xl font-ubuntu font-medium">{langConfig.challengeNoData}</p>
            : problems.map((problem, index) => {
              const { _id: competeProblemId, problemId, maxPoint } = problem
              const { title, difficulty } = problemId
              const challengeProps = {
                title,
                difficulty,
                maxPoint,
                competeProblemId,
                competeId
              }
              return (
                <Challenge key={index} {...challengeProps} />
              )
            })
        }
      </div>

      <Footer />
    </div>
  )
}

export default ChallengePage
