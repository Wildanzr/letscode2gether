import langConfig from '../../config/langConfig.json'
import api from '../../api'

import Cookies from 'js-cookie'
import { Input } from 'antd'
import debounce from 'lodash.debounce'
import { RiSearchLine } from 'react-icons/ri'

const { Search } = Input

const SearchDebounce = (props) => {
  // Destructure props
  const { setJourneys, setProblems, setMaterials, competeId, isChallenge, isMaterial, setDefaultCurrent, setTotal, limit, defaultCurrent, setSearch } = props
  console.log('Defatul current: ', defaultCurrent)

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
      const { data } = await api.get(`/competes?q=${value}&page=1&limit=10&isLearnPath=true`, config)
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

    // Config
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

  // Search materials
  const searchMaterial = async (e) => {
    // Destrcuture props
    const { value } = e.target

    // Set materials to null
    setMaterials(null)

    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get(`/materials?q=${value}&page=${defaultCurrent}&limit=${limit}`, config)
      // console.log(data)

      // Set materials
      const { materials } = data.data
      setMaterials(materials)

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
    onChange={isChallenge
      ? debounce(searchProblem, 500)
      : isMaterial
        ? debounce(searchMaterial, 500)
        : debounce(searchJourney, 500)}
        placeholder={isChallenge
          ? langConfig.formPlaceholderSearchChallenge
          : isMaterial
            ? langConfig.formPlaceholderSearchMaterial
            : langConfig.formPlaceholderSearchJourney
        }
        prefix={<RiSearchLine />}
        allowClear
        enterButton={langConfig.competeSearchButton}
    />
  )
}
export default SearchDebounce
