const Navbar = () => {
  return (
    <div className="flex flex-row lg:flex-col w-full lg:w-[10%] h-[7%] lg:h-screen py-2 px-2 bg-[#1F2937] items-center">
      <div className="flex w-1/6 lg:w-full h-full lg:h-[10%] items-center justify-center text-white bg-red-300" />
      <div className="flex flex-row lg:flex-col w-5/6 lg:w-full gap-2 lg:gap-5 lg:mt-5 items-center justify-center text-white">
        <button className="flex py-1 px-2 lg:w-full justify-center bg-[#111827] rounded-sm border-b-2 border-white hover:border-blue-500 duration-300">
          Problems
        </button>
        <button className="flex py-1 px-2 lg:w-full justify-center bg-[#111827] rounded-sm border-b-2 border-white hover:border-blue-500 duration-300">
          Submissions
        </button>
        <button className="flex py-1 px-2 lg:w-full justify-center bg-[#111827] rounded-sm border-b-2 border-white hover:border-blue-500 duration-300">
          Leaderboards
        </button>
      </div>
    </div>
  )
}

export default Navbar
