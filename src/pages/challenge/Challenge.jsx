import Challenge from '../../assets/challenge.svg'

import { RiSearchLine } from 'react-icons/ri'
import { Input, Cascader, Pagination } from 'antd'
import { Navbar, Footer } from '../../layout'

const ChallengePage = () => {
  const options = [
    {
      value: 'level',
      label: 'Level',
      children: [
        {
          value: 'easy',
          label: 'Easy'
        },
        {
          value: 'medium',
          label: 'Medium'
        },
        {
          value: 'hard',
          label: 'Hard'
        }
      ]
    },
    {
      value: 'solved',
      label: 'Solved'
    },
    {
      value: 'solve',
      label: 'Solve'
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
          <img src={Challenge} className="flex w-[60%]" />
        </div>

        <div className="flex w-full lg:w-2/3 items-center justify-center">
          <div className="flex flex-col w-full space-y-4 lg:space-y-8 items-center lg:items-start">
            <p className="text-3xl text-center lg:text-left mb-0 lg:text-5xl font-ubuntu font-medium">
              Challenge
            </p>
            <p className="flex lg:hidden font-ubuntu text-base lg:text-lg text-center lg:text-left">
              Are you looking for another challenge to improve your programming
              skills? Or you wanna develop problem solving skills? We have many
              problems here ready to solve here. Try me if you dare!
            </p>
            <p className="hidden lg:flex font-ubuntu text-base lg:text-lg text-center lg:text-left">
              Are you looking for another challenge to improve your programming
              skills? Or you wanna develop problem solving skills? We have many
              problems here ready to solve here. Try me if you dare!
            </p>

            <div className="flex w-full"></div>
          </div>
        </div>
      </div>

      {/* List Controller */}
      <div className="flex flex-col m-0 px-[5%] space-y-5 lg:pt-0 w-full items-center justify-between">
        <div className="w-full hidden lg:flex">
          <Input placeholder="Search Challenge" prefix={<RiSearchLine />} />
        </div>

        <div className="w-full hidden flex-row justify-between lg:flex">
          <Cascader
            options={options}
            onChange={onChange}
            placeholder="Filter Challenge"
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
          <div className="flex w-4/6 flex-col space-y-3">
            <p className='mb-0 font-ubuntu tracking-wide font-bold'>Salary with Bonus Hahahajiajdkjk adjksa jdasjdaskjdla sdsadkj  </p>
            <div className="flex flex-row w-full space-x-5 items-center">
              <p className='mb-0 text-sm font-ubuntu font-medium'>
                Level: <span className='pl-2 mb-0 text-sm font-ubuntu font-medium text-success'>easy</span>
              </p>

              <p className='mb-0 text-sm font-ubuntu font-medium'>
                Max Point: <span className='pl-2 mb-0 text-sm font-ubuntu font-medium text-easy'>40</span>
              </p>
            </div>
          </div>

          <div className="flex w-2/6 items-start justify-end">
            <button className='w-full lg:w-2/3 py-2 bg-main dark:bg-snow text-snow dark:text-main rounded font-medium lg:font-bold'>Solved</button>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full px-5 py-3 rounded-lg border-2 lg:border-4 border-easy bg-gradient-to-r from-[#CCF3F6] dark:from-[#30143F] via-[#DDCFF0] dark:via-[#151223] to:[#DCE7B3] dark:to-[#151729] duration-300 ease-out">
          <div className="flex w-4/6 flex-col space-y-3">
            <p className='mb-0 font-ubuntu tracking-wide font-bold'>Salary with Bonus Hahahajiajdkjk adjksa jdasjdaskjdla sdsadkj  </p>
            <div className="flex flex-row w-full space-x-5 items-center">
              <p className='mb-0 text-sm font-ubuntu font-medium'>
                Level: <span className='pl-2 mb-0 text-sm font-ubuntu font-medium text-success'>easy</span>
              </p>

              <p className='mb-0 text-sm font-ubuntu font-medium'>
                Max Point: <span className='pl-2 mb-0 text-sm font-ubuntu font-medium text-easy'>40</span>
              </p>
            </div>
          </div>

          <div className="flex w-2/6 items-start justify-end">
            <button className='w-full lg:w-2/3 py-2 bg-medium text-main rounded font-medium lg:font-bold'>Try Again</button>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full px-5 py-3 rounded-lg border-2 lg:border-4 border-easy bg-gradient-to-r from-[#CCF3F6] dark:from-[#30143F] via-[#DDCFF0] dark:via-[#151223] to:[#DCE7B3] dark:to-[#151729] duration-300 ease-out">
          <div className="flex w-4/6 flex-col space-y-3">
            <p className='mb-0 font-ubuntu tracking-wide font-bold'>Salary with Bonus Hahahajiajdkjk adjksa jdasjdaskjdla sdsadkj  </p>
            <div className="flex flex-row w-full space-x-5 items-center">
              <p className='mb-0 text-sm font-ubuntu font-medium'>
                Level: <span className='pl-2 mb-0 text-sm font-ubuntu font-medium text-success'>easy</span>
              </p>

              <p className='mb-0 text-sm font-ubuntu font-medium'>
                Max Point: <span className='pl-2 mb-0 text-sm font-ubuntu font-medium text-easy'>40</span>
              </p>
            </div>
          </div>

          <div className="flex w-2/6 items-start justify-end">
            <button className='w-full lg:w-2/3 py-2 bg-success text-snow rounded-lg font-medium lg:font-bold'>Lets Solve</button>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default ChallengePage
