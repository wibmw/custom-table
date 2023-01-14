import { ITable } from './Table'

const TableBody = ({ tableDatas, columns }: ITable) => {
  return (
    <>
      {/** *********** Body ******************/}
      <tbody>
        {tableDatas.length
          ? tableDatas?.map((data, index) => {
              // Table lines
              return (
                <tr key={data.id + '-' + index}>
                  {columns?.map(({ accessor, className }) => {
                    const tData = data[accessor] ? data[accessor] : '——'
                    return (
                      <td key={accessor} className={className}>
                        {tData}
                      </td>
                    )
                  })}
                </tr>
              )
            })
          : null}
      </tbody>
    </>
  )
}

export default TableBody
