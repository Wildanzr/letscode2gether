import langConfig from '../../../config/langConfig.json'
import { useState, useEffect } from 'react'

import api from '../../../api'
import { Navbar, Footer } from '../../../layout'
import { Breadcrumb } from '../../../components/breadcrumb'
import { SearchDebounce } from '../../../components/other'
import { EditableListofMaterial } from '../../../components/table'

import Cookies from 'js-cookie'
import { Pagination } from 'antd'

const ManageMaterialPage = () => {
  // Breadcrumb paths
  const [paths] = useState([
    {
      name: langConfig.adminMaterial1,
      target: '/admin/manage/materials'
    }
  ])

  const [materials, setMaterials] = useState(null)
  const [fetch, setFetch] = useState(true)
  const [secondFetch, setSecondFetch] = useState(false)

  // Pagination state
  const [search, setSearch] = useState('')
  const [defaultCurrent, setDefaultCurrent] = useState(1)
  const [total, setTotal] = useState(10)
  const [limit, setLimit] = useState(10)
  const paginationProps = {
    search,
    setSearch,
    defaultCurrent,
    setDefaultCurrent,
    total,
    setTotal,
    limit,
    setLimit
  }

  const onShowSizeChange = (current, pageSize) => {
    setDefaultCurrent(current)
    setLimit(pageSize)
    setSecondFetch(true)
  }

  const fetchMaterials = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }
    try {
      const { data } = await api.get('/materials?page=1&limit=10', config)
      // console.log(data)
      const { materials } = data.data

      if (materials.length === 0) {
        setMaterials([])
      } else {
        setMaterials(materials)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Search materials
  const searchMaterial = async () => {
    // Set materials to null
    setMaterials(null)

    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get(`/materials?q=${search}&page=${defaultCurrent}&limit=${limit}`, config)
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

  // Initial fetch challenge journey
  useEffect(() => {
    if (fetch) {
      fetchMaterials()
      setFetch(false)
    }
  }, [fetch])

  // Search problems when total or defaultCurrent changed
  useEffect(() => {
    if (secondFetch) {
      searchMaterial()
      setSecondFetch(false)
    }
  }, [total, defaultCurrent, secondFetch])
  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen space-y-14 bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <Navbar>
        <div className="flex flex-col w-11/12 space-y-6">
          {/* Header and Breadcrumb */}
          <div className="flex flex-col w-full">
            <h3 className="mb-0 font-ubuntu text-main dark:text-snow text-xl font-medium duration-300 ease-in-out">
              {langConfig.adminMaterial}
            </h3>
            <Breadcrumb paths={paths} />
          </div>

          {/* Search */}
          <div className="flex flex-col m-0 space-y-5 lg:pt-0 w-full items-center justify-between">

            <div className="w-full hidden lg:flex">
              <SearchDebounce isMaterial={true} setMaterials={setMaterials} {...paginationProps} />
            </div>

            <div className="w-full hidden flex-row justify-end lg:flex">
              <Pagination
                showSizeChanger
                onChange={onShowSizeChange}
                defaultCurrent={defaultCurrent}
                total={total}
                locale={{ items_per_page: '/ halaman' }}
              />
            </div>

            <div className="flex flex-row lg:hidden w-full space-x-5">
              <SearchDebounce isMaterial={true} setMaterials={setMaterials} {...paginationProps} />
            </div>

            <div className="w-full flex flex-row justify-center lg:hidden">
              <Pagination
                onShowSizeChange={onShowSizeChange}
                defaultCurrent={defaultCurrent}
                total={total}
              />
            </div>
          </div>

          {/* Challenges Data */}
          <div className="flex flex-col w-full space-y-2 overflow-y-auto">
            <div className="flex flex-col pb-4 overflow-y-auto">
              <div className="flex w-full">
                <EditableListofMaterial materials={materials} setFetch={setFetch}/>
              </div>
            </div>
          </div>

        </div>
      </Navbar>

      <Footer />
    </div>
  )
}

export default ManageMaterialPage
