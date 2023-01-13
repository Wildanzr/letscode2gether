import langConfig from '../../config/langConfig.json'
import { useState, useEffect } from 'react'

import { Navbar, Footer } from '../../layout'
import { Statistics } from '../../views'
import { StudentList } from '../../components/table'
import api from '../../api'

import Cookies from 'js-cookie'
import debounce from 'lodash.debounce'
import { RiSearchLine } from 'react-icons/ri'
import { Input, Pagination } from 'antd'

const { Search } = Input

const DashboardPage = () => {
  // Local states
  const [students, setStudents] = useState(null)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')
  const [total, setTotal] = useState(10)
  const [fetch, setFetch] = useState(true)

  const onShowSizeChange = (current, pageSize) => {
    setPage(current)
    setLimit(pageSize)
    setFetch(true)
  }

  // Handle search change
  const handleSearch = (e) => {
    setStudents(null)
    const query = e.target.value
    setSearch(query)
    setPage(1)
    setLimit(10)
    setFetch(true)
  }

  // Get student list data
  const getStudentList = async () => {
    // Reset student
    setStudents(null)

    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get(
        `/competes/student-list?q=${search}&page=${page}&limit=${limit}`,
        config
      )
      // console.log(data)

      // Set value
      setStudents(data.data)
      setLimit(data.meta.limit)
      setTotal(data.meta.total)
      setPage(data.meta.page)
    } catch (error) {
      console.log(error)
    }
  }

  // Initially get student list data
  useEffect(() => {
    if (fetch) {
      getStudentList()
      setFetch(false)
    }
  }, [fetch])
  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen space-y-14 bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <Navbar>
        <div className="flex flex-col w-11/12 space-y-6">
          <Statistics />

          {/* Leaderboard */}
          <h3 className="mb-0 font-ubuntu text-main dark:text-snow text-xl font-medium duration-300 ease-in-out">
            {langConfig.dashboardUserStudent}
          </h3>

          {/* List Controller */}
          <div className="flex flex-col m-0 space-y-5 lg:pt-0 w-full items-center justify-between">
            <div className="w-full hidden lg:flex">
              <Search
                placeholder={langConfig.studentSearchButton}
                prefix={<RiSearchLine />}
                allowClear
                onChange={debounce(handleSearch, 500)}
                enterButton={langConfig.searchButton}
              />
            </div>

            <div className="w-full hidden flex-row justify-end lg:flex">
              <Pagination
                onChange={onShowSizeChange}
                showSizeChanger
                defaultCurrent={page}
                total={total}
                locale={{ items_per_page: ' / halaman' }}
              />
            </div>

            <div className="flex flex-row lg:hidden w-full space-x-5">
              <Search
                placeholder={langConfig.studentSearchButton}
                prefix={<RiSearchLine />}
                allowClear
                onChange={debounce(handleSearch, 500)}
                enterButton={langConfig.searchButton}
              />
            </div>
            <div className="w-full flex flex-row justify-center lg:hidden">
              <Pagination
                onChange={onShowSizeChange}
                defaultCurrent={page}
                total={total}
                locale={{ items_per_page: ' / halaman' }}
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-center pb-5 overflow-y-auto">
            <div className="flex flex-col w-full items-center justify-center">
              <StudentList students={students} />
            </div>
          </div>
        </div>
      </Navbar>
      <Footer />
    </div>
  )
}

export default DashboardPage
