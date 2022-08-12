const RoomInfo = () => {
  return (
    <div className="flex flex-row w-full bg-[#4B5563] items-center justify-between">
      <div className="flex flex-col text-white">
        <p className="m-0">
          Driver: Wildanzr
          <br />
          Navigator: Azmi
          <br />
          Room Id: 12345
        </p>
      </div>

      <div className="flex flex-col h-full items-center lg:items-end justify-center text-white">
        <button className="flex py-1 px-2 bg-[#111827] rounded-sm border-b-2 border-white">
          Open Communication
        </button>
      </div>
    </div>
  )
}

export default RoomInfo
