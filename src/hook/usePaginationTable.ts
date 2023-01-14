import { useState, useEffect } from 'react'
import { ITableDatas } from '../components/Table'

// Pagination Table Hook
const usePaginationTable = ({ datas, page, rowsPerPage }: IPropsPagination) => {
  const [tableRange, setTableRange] = useState<number[]>([])
  const [slice, setSlice] = useState<ITableDatas[]>([])

  useEffect(() => {
    // Calculate Table Range
    const range = calculateRange({ datas, rowsPerPage })
    // Update Range State
    setTableRange([...range])
    // Slice Datas
    const slice = datas.slice((page - 1) * rowsPerPage, page * rowsPerPage)
    // Update Slice Stateq
    setSlice([...slice])
  }, [datas, setTableRange, page, setSlice, rowsPerPage])

  return { slice, range: tableRange }
}
// Calculate Table Range
const calculateRange = ({ datas, rowsPerPage }: IPropsRangeCalculation) => {
  const range: number[] = []
  const linesPerPage = Math.ceil(datas.length / rowsPerPage)

  for (let i = 1; i <= linesPerPage; i++) {
    range.push(i)
  }
  return range
}

export default usePaginationTable

// Interfaces
interface IPropsPagination extends IPropsRangeCalculation {
  page: number
}

interface IPropsRangeCalculation {
  datas: ITableDatas[]
  rowsPerPage: number
}
