import React from 'react'

const TitleTour = (props) => {
  // Destructure props
  const { title } = props
  return (
    <span className='font-bold text-lg text-easy'>
        {title}
    </span>
  )
}

export default TitleTour
