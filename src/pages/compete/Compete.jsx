import { useState, useEffect } from 'react'
import CompetePic from '../../assets/compete.svg'

import api from '../../api'
import { Compete } from '../../components/card'
import { JoinCompete } from '../../components/modal'

import { RiSearchLine } from 'react-icons/ri'
import { Input, Cascader, Pagination, Spin } from 'antd'
import { Navbar, Footer } from '../../layout'

const CompetePage = () => {
  // Local States
  const options = [
    {
      value: 'on going',
      label: 'On Going'
    },
    {
      value: 'passed',
      label: 'Passed'
    },
    {
      value: 'joined',
      label: 'Joined'
    }
  ]
  const [competes, setCompetes] = useState(null)
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(10)
  const [fetch, setFetch] = useState(true)

  // Compete props drill
  const [selectedCompete, setSelectedCompete] = useState(null)

  const onChange = (value) => {
    console.log(value)
  }

  const onShowSizeChange = (current, pageSize) => {
    setCurrent(current)
    setTotal(parseInt(pageSize))
  }

  // Fetch Competes
  const fetchCompetes = async () => {
    try {
      const { data } = await api.get(
        `/competes?page=${current}&limit=${total}&isLearnPath=false&isChallenge=false`
      )
      const { meta } = data
      const { competes } = data.data
      // console.log(data)

      // Set values
      setCompetes(competes)
      setCurrent(parseInt(meta.page))
      setTotal(parseInt(meta.total))
    } catch (error) {
      console.log(error)
    }
  }

  // Initial fetch competes
  useEffect(() => {
    if (fetch) {
      fetchCompetes()
      setFetch(false)
    }
  }, [fetch])

  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen space-y-14 bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <Navbar>
        <div className="flex px-[5%] flex-col lg:flex-row-reverse w-full items-center justify-center lg:justify-between">
          <div className="flex w-full lg:w-1/3 items-center justify-center">
            <img src={CompetePic} className="flex w-[60%]" />
          </div>

          <div className="flex w-full lg:w-2/3 items-center justify-center">
            <div className="flex flex-col w-full space-y-4 lg:space-y-8 items-center lg:items-start">
              <p className="text-3xl text-center lg:text-left mb-0 lg:text-5xl font-ubuntu font-medium">
                Compete
              </p>
              <p className="flex lg:hidden font-ubuntu text-base lg:text-lg text-center lg:text-left">
                Competition is a a rivalry where two or more parties strive for
                a common goal which cannot be shared: where one&apos;s gain is
                the other&apos;s loss. But, in this competition you can share
                and collaborate with your friend to solve the problem. Ready to
                start?
              </p>
              <p className="hidden lg:flex font-ubuntu text-base lg:text-lg text-center lg:text-left">
                Competition is a a rivalry where two or more parties strive for
                a common goal which cannot be shared: where one&apos;s gain is
                the other&apos;s loss. But, in this competition you can share
                and collaborate with your friend to solve the problem. Ready to
                start?
              </p>
            </div>
          </div>
        </div>

        {/* List Controller */}
        <div className="flex flex-col m-0 px-[5%] space-y-5 lg:pt-0 w-full items-center justify-between">
          <div className="w-full hidden lg:flex">
            <Input placeholder="Search Compete" prefix={<RiSearchLine />} />
          </div>

          <div className="w-full hidden flex-row justify-between lg:flex">
            <Cascader
              options={options}
              onChange={onChange}
              placeholder="Filter Compete"
            />

            <Pagination
              onChange={onShowSizeChange}
              defaultCurrent={current}
              total={total}
            />
          </div>

          <div className="flex flex-row lg:hidden w-full space-x-5">
            <Input placeholder="Search Challenge" prefix={<RiSearchLine />} />
            <Cascader
              options={options}
              onChange={onChange}
              placeholder="Filter Challenge"
            />
          </div>

          <div className="w-full flex flex-row justify-center lg:hidden">
            <Pagination
              onChange={onShowSizeChange}
              defaultCurrent={current}
              total={total}
            />
          </div>

          {/* Compete List */}
          {competes === null
            ? (
            <Spin size="default" />
              )
            : competes.length === 0
              ? (
            <p className="text-center text-xl font-ubuntu">No Compete</p>
                )
              : (
                  competes.map((compete, index) => {
                    const { key: competeKey } = compete
                    const competeProps = {
                      competeKey,
                      ...compete,
                      selectedCompete,
                      setSelectedCompete
                    }
                    return <Compete key={index} {...compete} {...competeProps} />
                  })
                )}

          {/* Modal for join compete */}
          <JoinCompete
            selectedCompete={selectedCompete}
            setSelectedCompete={setSelectedCompete}
          />
        </div>
      </Navbar>

      <Footer />
    </div>
  )
}

export default CompetePage
