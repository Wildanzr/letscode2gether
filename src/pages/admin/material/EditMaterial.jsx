import langConfig from '../../../config/langConfig.json'
import { useState, useEffect } from 'react'

import api from '../../../api'
import { Navbar, Footer } from '../../../layout'
import { Breadcrumb } from '../../../components/breadcrumb'
import { EditMaterial } from '../../../components/form'

import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'

const EditMaterialPage = () => {
  // useParams
  const { materialId } = useParams()

  // Breadcrumb paths
  const [paths] = useState([
    {
      name: langConfig.adminMaterial1,
      target: '/admin/manage/materials'
    },
    {
      name: langConfig.adminMaterial2,
      target: `/admin/manage/materials/${materialId}/edit`
    }
  ])

  // Local states
  const [materialDetail, setMaterialDetail] = useState(null)

  // Get material detail
  const getProblemDetail = async () => {
    // Configuration
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get(`/materials/${materialId}`, config)
      const { material } = data.data
      console.log('Material', material)
      setMaterialDetail(material)
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
              {langConfig.adminMaterial}
            </h3>
            <Breadcrumb paths={paths} />
          </div>

          {/* Edit Material */}
          {materialDetail && <EditMaterial materialDetail={materialDetail} />}
        </div>
      </Navbar>
      <Footer />
    </div>
  )
}

export default EditMaterialPage
