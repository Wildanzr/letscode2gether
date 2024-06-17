import React, { useState, useEffect } from 'react'

import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'
import ReactQuill from 'react-quill'

import { Navbar as MainNavbar, Footer } from '../../layout'
import api from '../../api'
import { useAuth } from '../../contexts/AuthContext'

const MaterialDetailPage = () => {
  const { materialId } = useParams()

  // Auth States and Functions
  const { authStates, authFunctions } = useAuth()
  const { user } = authStates
  const { travelLog } = authFunctions

  // Local States
  const [material, setMaterial] = useState(null)
  const [from] = useState(new Date())

  // Get material detail
  const getMaterialDetail = async () => {
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
      const { data } = await api.post(`/materials/${materialId}/register`, {}, config)
      console.log(data)
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

  // Initially get material detail
  useEffect(() => {
    getMaterialDetail()
  }, [])

  // UseEffect when leaving page
  useEffect(() => {
    return () => {
      if (user) {
        travelLog(`Visiting material detail page ->${materialId}`, from, new Date())
        registerParticipant()
      }
    }
  }, [user])

  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen bg-milk dark:bg-main duration-300 ease-in-out text-main dark:text-snow ">
      <MainNavbar>
        {material && (
          <main className="flex flex-col w-full h-full items-center justify-center p-5 text-main dark:text-snow duration-300 ease-in-out">
            <h3 className="text-3xl text-center lg:text-left mb-0 lg:text-5xl font-ubuntu font-medium p-5 text-main dark:text-snow duration-300 ease-in-out">
              {material.title}
            </h3>

            {renderMaterialContent(material.content)}
          </main>
        )}
      </MainNavbar>
      <Footer />
    </div>
  )
}

export default MaterialDetailPage
