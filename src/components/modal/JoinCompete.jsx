import { useState, useEffect } from 'react'

import { JoinCompete as JoinCompeteForm } from '../../components/form'

import { BsXLg } from 'react-icons/bs'
import { Spin } from 'antd'

const JoinCompete = (props) => {
  // Props destructuring
  const { selectedCompete, setSelectedCompete } = props
  const { _id, name } = selectedCompete || {}

  // Local States
  const [render, setRender] = useState(false)

  // Close modal and reset selectedCompete
  const closeModal = () => {
    setSelectedCompete(null)
  }

  // Initailly render when selectedCompete is not null
  useEffect(() => {
    if (selectedCompete !== null) {
      setRender(true)
    }
  }, [selectedCompete])

  return (
    <>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="modal-join-compete" className="modal-toggle" />
      <div className="modal font-ubuntu">
        <div className="modal-box relative bg-snow dark:bg-alternate duration-300 ease-in-out">
          <label
            htmlFor="modal-join-compete"
            onClick={closeModal}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            <BsXLg />
          </label>

          {/* Content */}
          <div className="flex flex-col w-full">
            {!render
              ? (
              <Spin size="default" />
                )
              : (
              <div className='flex flex-col space-y-4 items-center justify-center'>
                <h3 className="text-lg font-bold tracking-wide text-center text-main dark:text-snow duration-300 ease-in-out">
                  Join {name} ?
                </h3>

                <JoinCompeteForm competeId={_id} />
              </div>
                )}
          </div>
        </div>
      </div>
    </>
  )
}

export default JoinCompete
