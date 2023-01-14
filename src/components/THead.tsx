import { useState } from 'react'
import { IColumn } from './Table'

const THead = ({ columns, handleSorting }: IPropsHead) => {
  // Active Sorted By Field
  const [sortField, setSortField] = useState<string>('')
  // Sort Order Asc/Desc
  const [order, setOrder] = useState<'desc' | 'asc'>('asc')
  // OnSortingChange, update Active Field and Sort Order
  const handleSortingChange = (accessor: string) => {
    const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc'
    setSortField(accessor)
    setOrder(sortOrder)
    handleSorting(accessor, sortOrder)
  }

  return (
    <>
      {/** *********** Sortable Header ******************/}
      <thead>
        <tr>
          {columns.map(({ label, accessor, sortable }) => {
            // Define the good icone depending on sorting order
            const className = sortable
              ? sortField === accessor && order === 'asc'
                ? 'up'
                : sortField === accessor && order === 'desc'
                ? 'down'
                : 'default'
              : ''
            return (
              // Column Header
              <th key={accessor} onClick={sortable ? () => handleSortingChange(accessor) : undefined} className={className}>
                {label}
              </th>
            )
          })}
        </tr>
      </thead>
    </>
  )
}

export default THead

// Interfaces
export interface IPropsHead {
  columns: IColumn[]
  handleSorting: (sortField: string, sortOrder: string) => void
}
