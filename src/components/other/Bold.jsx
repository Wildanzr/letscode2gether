import React from 'react'

const Bold = (props) => {
  const { text } = props

  return (
    <span className='font-bold'>
        {text}
    </span>
  )
}

export default Bold
