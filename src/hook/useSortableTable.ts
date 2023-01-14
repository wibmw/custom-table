import { useEffect, useState } from 'react'
import { IColumn, ITableDatas } from '../components/Table'
import { FilterableTable } from '../utils/filter'

// Sort Table Hook
const useSortableTable = (data: ITableDatas[], columns: IColumn[]) => {
  // Table Search Filter
  const [filter, setFilter] = useState<string>(''),
    // Table Filtered Datas
    [filteredData, setFilteredData] = useState(data),
    [tableData, setTableData] = useState(getDefaultSorting(filteredData, columns))

  useEffect(() => {
    setFilteredData(FilterableTable(data, filter))
  }, [filter])

  const HandleSorting = (sortedField: string, sortOrder: string) => {
    if (sortedField) {
      const sorted = [...getDefaultSorting(filteredData, columns)]?.sort((a, b) => {
        // Check for null values
        if (a[sortedField] === null || b[sortedField] === null) return isNullValue(a, b, sortedField)
        // return sorted datas
        return sortByOrder(a, b, sortedField, sortOrder)
      })
      // Update the datas state
      setTableData(sorted)
    }
  }
  useEffect(() => {
    setTableData(getDefaultSorting(filteredData, columns))
  }, [filteredData])

  return [tableData, HandleSorting, setFilter] as const
}

// Default sorting
const getDefaultSorting = (data: ITableDatas[], columns: IColumn[]) => {
  // Check if data is iterable
  if (!(Symbol.iterator in Object(data))) {
    return data
  }
  const sorted = [...data]?.sort((a, b) => {
    // Get the list of all sortable columns
    const filterColumn = columns.filter((column) => column?.sortable)
    // Merge all array objects into single object and extract accessor and sortbyOrder keys
    const { accessor = 'id', sortOrder = 'asc' } = Object.assign({}, ...filterColumn)
    // Check for null values
    if (a[accessor] === null || b[accessor] === null) return isNullValue(a, b, accessor)
    // return sorted datas
    return sortByOrder(a, b, accessor, sortOrder)
  })
  // Return default sorted datas
  return sorted
}
// Check for null values
const isNullValue = (a: ITableDatas, b: ITableDatas, sortedField: string) => {
  if (a[sortedField] === null) return 1
  if (b[sortedField] === null) return -1
  if (a[sortedField] === null && b[sortedField] === null) return 0
  else return 0
}
// Sort Datas by Order
const sortByOrder = (a: ITableDatas, b: ITableDatas, sortedField: string, sortOrder: string) => {
  const ascending = a[sortedField]?.toString().localeCompare(b[sortedField].toString(), 'en', {
    numeric: true,
  })
  return sortOrder === 'asc' ? ascending : -ascending
}

export default useSortableTable
