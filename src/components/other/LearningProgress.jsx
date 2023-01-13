import { useState, useEffect } from 'react'

import api from '../../api'

import Cookies from 'js-cookie'
import { Spin } from 'antd'

const LearningProgress = (props) => {
  // Props destructure
  const { studentId } = props

  // Local state
  const [progress, setProgress] = useState(null)

  // Get student progres
  const getStudentProgress = async () => {
    // Config
    const config = {
      headres: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get(`/competes/student-progress/${studentId}`, config)
      // console.log(data.data.progress)

      // Set values
      setProgress(data.data.progress)
    } catch (error) {
      console.log(error)
    }
  }

  // Initially get student progress
  useEffect(() => {
    getStudentProgress()
  }, [])
  return (
      <td className="py-3 px-5 text-left overflow-clip">
      <div className="flex items-center justify-center">
        <div className="font-medium whitespace-nowrap">
          {progress === null
            ? <Spin size='small' />
            : <span className="font-bold text-success">{`${progress}%`}</span>
          }
        </div>
      </div>
    </td>
  )
}

export default LearningProgress
