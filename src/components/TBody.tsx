import { useMemo } from 'react'
import { ITable } from './Table'

const TableBody = ({ tableDatas, columns }: ITable) => {
  const rows = useMemo(() => {
    if (!tableDatas.length) return null
    return tableDatas.map((data, index) => {
      return (
        <tr key={data.id + '-' + index}>
          {columns.map(({ accessor, className }) => {
            const tData = data[accessor] || '——'
            return (
              <td key={accessor} className={className}>
                {tData}
              </td>
            )
          })}
        </tr>
      )
    })
  }, [tableDatas, columns])

  return (
    <>
      {/** *********** Body ******************/}
      <tbody>{rows}</tbody>
    </>
  )
}

export default TableBody
