import React, { useState, useEffect } from 'react'

import Cookies from 'js-cookie'
import { useParams, useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill'
import { Skeleton } from 'antd'

import { Navbar as MainNavbar, Footer } from '../../layout'
import api from '../../api'
import { useAuth } from '../../contexts/AuthContext'

const MaterialDetailPage = () => {
  const { materialId } = useParams()

  // Navigator
  const navigate = useNavigate()

  // Auth States and Functions
  const { authStates, authFunctions } = useAuth()
  const { user } = authStates
  const { travelLog } = authFunctions

  // Local States
  const [materials, setMaterials] = useState(null)
  const [material, setMaterial] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [hasNext, setHasNext] = useState(false)
  const [from] = useState(new Date())

  // Get all materials
  const getAllMaterials = async () => {
    setMaterials(null)
    setCurrentIndex(-1)
    setHasNext(false)
    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    try {
      const { data } = await api.get('/materials?page=1&limit=100', config)
      // console.log(data)

      const { materials } = data.data
      setMaterials(materials)

      // Find the index of the current material
      const index = materials.findIndex((m) => m._id === materialId)
      setCurrentIndex(index)

      // Check if there is a next material
      if (index + 1 < materials.length) {
        setHasNext(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Get material detail
  const getMaterialDetail = async () => {
    setMaterial(null)
    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    try {
      const { data } = await api.get(`/materials/${materialId}`, config)
      // console.log(data)

      const { material } = data.data
      setMaterial(material)
    } catch (error) {
      console.log(error)
    }
  }

  // Register participant
  const registerParticipant = async () => {
    // Config
    const config = {
      headers: {
        authorization: Cookies.get('jwtToken')
      }
    }

    try {
      await api.post(
        `/materials/${materialId}/register`,
        {},
        config
      )
    } catch (error) {
      console.log(error)
    }
  }

  // Render material content
  const renderMaterialContent = (content) => {
    return (
      <div className="flex flex-col w-full">
        <ReactQuill
          className="w-full h-full font-ubuntu text-base"
          theme="bubble"
          value={content}
          readOnly={true}
          placeholder="Deskripsi permasalahan"
        />
      </div>
    )
  }

  // Handle Navigation
  const handleNavigation = async (next) => {
    await registerParticipant()
    if (next) {
      // window.location.href = `/materials/learn/${materials[currentIndex + 1]._id}`
      navigate(`/materials/learn/${materials[currentIndex + 1]._id}`)
    } else {
      // window.location.href = `/materials/learn/${materials[currentIndex - 1]._id}`
      navigate(`/materials/learn/${materials[currentIndex - 1]._id}`)
    }
  }

  // Initially get material detail
  useEffect(() => {
    getAllMaterials()
    getMaterialDetail()
  }, [materialId])

  // UseEffect when leaving page
  useEffect(() => {
    return () => {
      if (user) {
        travelLog(
          `Visiting material detail page ->${materialId}`,
          from,
          new Date()
        )
      }
    }
  }, [user])

  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen bg-milk dark:bg-main duration-300 ease-in-out text-main dark:text-snow ">
      <MainNavbar>
        {material === null
          ? (
          <main className="flex flex-col w-full h-screen items-center justify-center p-5 text-main dark:text-snow duration-300 ease-in-out">
            <Skeleton active paragraph={5} />
          </main>
            )
          : (
          <main className="flex flex-col w-full h-full items-center justify-center p-5 text-main dark:text-snow duration-300 ease-in-out">
            <h3 className="text-3xl text-center lg:text-left mb-0 lg:text-5xl font-ubuntu font-medium p-5 text-main dark:text-snow duration-300 ease-in-out">
              {material?.title}
            </h3>

            {renderMaterialContent(material?.content)}

            <div className="flex w-full h-full items-center justify-between p-5">
              <button
                disabled={currentIndex === 0}
                className={`w-40 py-2 bg-easy text-snow text-center text-base hover:text-lg hover:text-snow hover:dark:text-snow font-medium rounded duration-300 ease-in-out ${
                  currentIndex === 0 ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                onClick={() => handleNavigation(false)}
              >
                Sebelumnya
              </button>

              <button
                disabled={!hasNext}
                className={`w-40 py-2 bg-success text-main text-center text-base hover:text-main hover:dark:text-main hover:text-lg font-medium rounded duration-300 ease-in-out ${
                  !hasNext ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                onClick={() => handleNavigation(true)}
              >
                Selanjutnya
              </button>
            </div>
          </main>
            )}
      </MainNavbar>
      <Footer />
    </div>
  )
}

export default MaterialDetailPage
