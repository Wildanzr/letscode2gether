import Compete from '../../assets/compete.svg'

import { RiSearchLine } from 'react-icons/ri'
import { Input, Cascader, Pagination } from 'antd'
import { Navbar, Footer } from '../../layout'

const CompetePage = () => {
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

  const onChange = (value) => {
    console.log(value)
  }

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize)
  }
  return (
    <div className="flex flex-col w-full min-h-screen space-y-14 bg-snow dark:bg-main text-main dark:text-snow duration-300 ease-in-out">
      <Navbar />

      <div className="flex px-[5%] flex-col lg:flex-row-reverse w-full items-center justify-center lg:justify-between">
        <div className="flex w-full lg:w-1/3 items-center justify-center">
          <img src={Compete} className="flex w-[60%]" />
        </div>

        <div className="flex w-full lg:w-2/3 items-center justify-center">
          <div className="flex flex-col w-full space-y-4 lg:space-y-8 items-center lg:items-start">
            <p className="text-3xl text-center lg:text-left mb-0 lg:text-5xl font-ubuntu font-medium">
              Compete
            </p>
            <p className="flex lg:hidden font-ubuntu text-base lg:text-lg text-center lg:text-left">
              Competition is a  a rivalry where two or more parties strive for a common goal which cannot be
              shared: where one&apos;s gain is the other&apos;s loss. But,  in this competition you can share and
              collaborate with your friend to solve the problem. Ready to start?
            </p>
            <p className="hidden lg:flex font-ubuntu text-base lg:text-lg text-center lg:text-left">
              Competition is a  a rivalry where two or more parties strive for a common goal which cannot be
              shared: where one&apos;s gain is the other&apos;s loss. But,  in this competition you can share and
              collaborate with your friend to solve the problem. Ready to start?
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
            onShowSizeChange={onShowSizeChange}
            defaultCurrent={3}
            total={20}
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
            onShowSizeChange={onShowSizeChange}
            defaultCurrent={3}
            total={20}
          />
        </div>

        <div className="flex flex-row justify-between w-full px-5 py-3 rounded-lg border-2 lg:border-4 border-easy bg-gradient-to-r from-[#CCF3F6] dark:from-[#30143F] via-[#DDCFF0] dark:via-[#151223] to:[#DCE7B3] dark:to-[#151729] duration-300 ease-out">
          <div className="flex w-4/6 flex-col">
            <p className='mb-0 font-ubuntu text-3xl tracking-wide font-medium'>UAP PEMDAS - FILKOM 2022</p>
            <div className="flex flex-col w-full space-y-2 items-start">
              <p className='mb-0 text-sm font-ubuntu font-medium'>
                Challenger: <span className='pl-2 mb-0 text-sm font-ubuntu font-thin text-easy'>Mr. John Doe</span>
              </p>
              <p className='mb-0 text-sm font-ubuntu font-medium'>
                Starts In: <span className='mb-0 text-sm font-ubuntu font-thin'>Wednesday, 24 May 2022 14:00</span>
              </p>
              <p className='mb-0 text-sm font-ubuntu font-medium'>
                Ends In: <span className='pl-2 mb-0 text-sm font-ubuntu font-thin'>Wednesday, 24 May 2022 16:00</span>
              </p>
              <p className='mb-0 text-sm font-ubuntu font-thin text-justify'>
                <span className='font-medium'>Description:</span> <br />
                Praesent gravida nisi velit, eu gravida nunc ultrices nec. Donec ut rutrum lacus, quis imperdiet urna. Cras mollis lectus eu neque dictum, at mollis enim tristique. Curabitur convallis nulla mauris, vitae posuere tortor scelerisque tristique. Aliquam pellentesque justo in scelerisque commodo. Integer urna leo, elementum et nisi nec, fringilla efficitur dui. Integer placerat justo semper nisi imperdiet suscipit. Ut consectetur, eros non molestie tempus, eros lectus blandit enim, at pellentesque arcu eros sit amet dolor. Nam eget justo sem.
              </p>
            </div>
          </div>

          <div className="flex w-2/6 items-start justify-end">
            <button className='w-full lg:w-2/3 py-2 bg-main dark:bg-alternate text-snow dark:text-snow rounded font-medium'>Join Now</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default CompetePage
