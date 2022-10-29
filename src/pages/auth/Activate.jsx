import { useState, useEffect } from 'react'
import { useGlobal } from '../../contexts/GlobalContext'

import api from '../../api'
import { Navbar, Footer } from '../../layout'

import { useSearchParams, useNavigate } from 'react-router-dom'
import { Spin } from 'antd'

const ActivatePage = () => {
  // Search Params
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  // Navigator
  const navigate = useNavigate()

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Local States
  const [loading, setLoading] = useState(true)
  const [text, setText] = useState('Verification on progress ...')

  useEffect(() => {
    // Verify token
    const verifyToken = async () => {
      setLoading(true)

      try {
        const { data } = await api.get(`/auth/verify?token=${token}`)

        setText(data.message)
        mySwal.fire({
          icon: 'success',
          title: data.message,
          allowOutsideClick: true,
          backdrop: true,
          allowEscapeKey: true,
          timer: 4000,
          showConfirmButton: false
        }).then(() => {
          navigate('/auth/login')
        })
      } catch (error) {
        mySwal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.message,
          showConfirmButton: false,
          timer: 3000
        }).then(() => {
          setText(error.response.data.message)
        })
      }
      setLoading(false)
    }

    verifyToken()
  }, [])

  return (
    <div className="flex flex-col items-center justify-between font-ubuntu w-full min-h-screen space-y-14 bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <Navbar />
      <div className="flex flex-col items-center w-2/3 lg:w-1/3 justify-center">
        <p className="text-2xl lg:text-4xl text-center">
          Verifying account activation
        </p>
        <div className="flex flex-col w-[90%] md:w-[70%] lg:w-[35%] space-y-2">
          <Spin spinning={loading} size="large" />
        </div>
        <p className="mb-0 font-bold text-xl md:text-2xl lg:text-3xl text-center tracking-wide">
          {text}
        </p>
      </div>
      <Footer />
    </div>
  )
}

export default ActivatePage
