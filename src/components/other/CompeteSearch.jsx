import { useAuth } from '../../contexts/AuthContext'

import api from '../../api'

import Cookies from 'js-cookie'
import { Input } from 'antd'
import debounce from 'lodash.debounce'
import { RiSearchLine } from 'react-icons/ri'

const { Search } = Input

const CompeteSearch = (props) => {
  // Destructure props
  const { setJourneys, setProblems, competeId, isChallenge, setDefaultCurrent, setTotal, limit, defaultCurrent, setSearch } = props

  // Auth States
  const { authStates } = useAuth()
  const { user } = authStates

  // Search journeys
  const searchJourney = async (e) => {
    // Destructure props
    const { value } = e.target

    // Set jounrey to null
    setJourneys(null)

    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const ENDPOINT = `/competes?q=${value}&page=1&limit=10&isLearnPath=false&isChallenge=false&challengerId=${user._id}`
      const { data } = await api.get(ENDPOINT, config)
      //   console.log(data)

      setJourneys(data.data.competes)
    } catch (error) {
      console.log(error)
    }
  }

  // Search problems
  const searchProblem = async (e) => {
    // Destrcuture props
    const { value } = e.target

    // Set problems to null
    setProblems(null)

    // Set search
    setSearch(value)

    // // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get(`/competes/${competeId}/challenges?q=${value}&page=${defaultCurrent}&limit=${limit}`, config)
      // console.log(data)

      // Set problems
      const { problems } = data.data
      setProblems(problems)

      // Set meta
      const { page, total } = data.meta
      setDefaultCurrent(parseInt(page))
      setTotal(parseInt(total))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Search
        placeholder="Search Learning Journey"
        onChange={isChallenge ? debounce(searchProblem, 500) : debounce(searchJourney, 500)}
        prefix={<RiSearchLine />}
        allowClear
        enterButton="Search"
    />
  )
}
export default CompeteSearch
