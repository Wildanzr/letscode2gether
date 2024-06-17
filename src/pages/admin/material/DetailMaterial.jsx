import langConfig from '../../../config/langConfig.json'
import { useState, useEffect } from 'react'

import api from '../../../api'
import { Navbar, Footer } from '../../../layout'
import { Breadcrumb } from '../../../components/breadcrumb'
import { Description } from '../../../components/other'

import Cookies from 'js-cookie'
import { Skeleton } from 'antd'
import { useParams } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'

const DetailMaterialPage = () => {
  // useParams
  const { materialId } = useParams()

  // Breadcrumb paths
  const [paths] = useState([
    {
      name: langConfig.adminMaterial1,
      target: '/admin/manage/materials'
    },
    {
      name: langConfig.adminMaterial3,
      target: `/admin/manage/materials/${materialId}`
    }
  ])

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
      setMaterialDetail(material)
    } catch (error) {
      console.log(error)
    }
  }

  // Render problem description
  const renderMaterialContent = (description) => {
    return (
      <div className="flex flex-col w-full bg-snow text-main">
        <ReactQuill
          className="w-full h-full font-ubuntu text-base"
          theme="bubble"
          value={description}
          readOnly={true}
          placeholder="Deskripsi permasalahan"
        />
      </div>
    )
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

          {/* Detail of Problem */}
          {materialDetail
            ? (
              <div className="flex flex-col space-y-4 w-full font-ubuntu">
                <Description title={langConfig.materialName} value={materialDetail.title} />
                <Description title={langConfig.materialContent} value={renderMaterialContent(materialDetail.content)} />
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

export default DetailMaterialPage
