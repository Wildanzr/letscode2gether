import React from 'react'

import { Table } from 'antd'
import type { ColumnsType, TableProps } from 'antd/es/table'

const Leaderboards = () => {
  interface DataType {
    key: React.Key;
    rank: number;
    username: string;
    score: number;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      sorter: (a, b) => a.rank - b.rank
    },
    {
      title: 'Username',
      dataIndex: 'username',
      sorter: (a: DataType, b: DataType) => a.username.localeCompare(b.username)
    },
    {
      title: 'Score',
      dataIndex: 'score',
      sorter: (a: DataType, b: DataType) => a.score - b.score
    }
  ]

  const data: DataType[] = [
    {
      key: '1',
      username: 'John Brown',
      rank: 1,
      score: 60
    },
    {
      key: '2',
      username: 'Jim Green',
      rank: 2,
      score: 66
    },
    {
      key: '3',
      username: 'Joe Black',
      rank: 3,
      score: 90
    },
    {
      key: '4',
      username: 'Jim Red',
      rank: 3,
      score: 99
    }
  ]

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="flex flex-col w-full">
        <h4 className="mb-0 text-lg lg:text-2xl text-white font-semibold ">
          Program Mengeja Angka 1 Hingga 100
        </h4>
        <p className="mb-0 text-sm font-thin text-white">
          Challenger: <span className="font-semibold">meowwed</span>
        </p>
      </div>

      <div className="flex flex-col w-full">
        <Table columns={columns} dataSource={data} onChange={onChange} pagination={false}/>
      </div>
    </div>
  )
}

export default Leaderboards
