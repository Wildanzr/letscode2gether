import { useState, useEffect } from 'react'

import api from '../../api'
import { Navbar, Footer } from '../../layout'
import { Reset } from '../../components/form'

import { Spin } from 'antd'
import { useSearchParams } from 'react-router-dom'

const ResetPage = () => {
  // Search Params
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  // Local States
  const [isTokenValid, setIsTokenValid] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [text, setText] = useState('Validating token...')

  // Validate token
  useEffect(() => {
    const validateToken = async () => {
      try {
        const { data } = await api.get(`/auth/reset-password?token=${token}`)

        setIsTokenValid(data.data.isTokenValid)
        setText(data.message)
      } catch (error) {
        console.log(error)
        setIsTokenValid(false)
        setText('Token is invalid or has expired!')
      } finally {
        setIsLoading(false)
      }
    }

    validateToken()
  }, [])

  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen space-y-14 font-ubuntu bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <Navbar />
      <div className="flex flex-col items-center w-2/3 lg:w-1/3 justify-center">
        <p className="text-2xl lg:text-4xl text-center">Reset Password</p>
        {isTokenValid && (
          <p className="text-base lg:text-sm text-center font-ubuntu">
            We found your account, now you can reset your password
          </p>
        )}
        {isTokenValid
          ? (
          <Reset token={token} />
            )
          : (
          <div className="flex w-full flex-col space-y-4">
            <Spin size="large" spinning={isLoading} />
            <p className="text-base text-center">{text}</p>
          </div>
            )}
      </div>
      <Footer />
    </div>
  )
}

export default ResetPage
