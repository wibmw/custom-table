import { ChangeEvent, useState } from 'react'
import THead from './THead'
import TBody from './TBody'
import TFooter from './TFooter'
import useSortableTable from '../hook/useSortableTable'
import usePaginationTable from '../hook/usePaginationTable'
import { FilterableTable } from '../utils/filter'

const Table = ({ title, tableDatas, columns }: IPropsTable) => {
  // Table Search Filter
  const [filter, setFilter] = useState<string>(''),
    // Table Sorted Datas
    [sortedDatas, handleSorting] = useSortableTable(tableDatas, columns),
    // Table Active Page
    [page, setPage] = useState<number>(1),
    // Table Page Lines Number
    [rowsPerPage, setRowsPerPage] = useState<number>(10),
    // Table Filtered Datas
    [filteredData, setFilteredData] = useState(FilterableTable(sortedDatas, filter)),
    // Filtered Datas Slices
    { slice, range } = usePaginationTable({ datas: filteredData, page, rowsPerPage }),
    // On Filter Change, update the filter state, filter the sorted datas with the new value
    // Set the active page to 1 to prevent issues
    handleFilterChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
      setFilter(target.value.replace(/[^a-zA-Z0-9 ]/g, ''))
      setFilteredData(FilterableTable(sortedDatas, filter))
      setPage(1)
    }

  return (
    <>
      {/** \\\\\\\\\\\ Table Component \\\\\\\\\\\\\\\\\/}
      {/** *********** Title ******************/}
      <h1>{title}</h1>
      {/** *********** Search/Filter Section ******************/}
      <div className='filter'>
        <label htmlFor='filter'>Search </label>
        <input type='text' id='filter' name='filter' onChange={handleFilterChange} />
      </div>
      <div className='tableWrapper'>
        {/** *********** Table ******************/}
        <table>
          {/** *********** Sortable Header ******************/}
          <THead {...{ columns, handleSorting }} />
          {/** *********** Body ******************/}
          {slice.length ? <TBody {...{ columns, tableDatas: slice }} /> : null}
        </table>
        {/** *********** Pagination Footer ******************/}
        <TFooter {...{ sliceLength: slice.length, range, setPage, page, setRangeScope: setRowsPerPage }} />
      </div>
    </>
  )
}

export default Table

// Interfaces
interface IPropsTable extends ITable {
  title: string
}

export interface ITable {
  tableDatas: ITableDatas[]
  columns: IColumn[]
}

export interface IColumn {
  label: string
  accessor: string
  sortable: boolean
  className: string
}

export interface ITableDatas extends Record<any, any> {
  id?: number
}
