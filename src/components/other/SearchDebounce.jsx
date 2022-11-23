import api from '../../api'

import Cookies from 'js-cookie'
import { Input } from 'antd'
import debounce from 'lodash.debounce'
import { RiSearchLine } from 'react-icons/ri'

const { Search } = Input

const SearchDebounce = (props) => {
  // Destructure props
  const { setJourneys } = props

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
  return (
    <Search
        placeholder="Search Learning Journey"
        onChange={debounce(searchJourney, 800)}
        prefix={<RiSearchLine />}
        enterButton="Search"
    />
  )
}
export default SearchDebounce
