import { ITableDatas } from '../components/Table'

export const FilterableTable = (unFilteredDatas: ITableDatas[], filter: string) => {
  const insensitiveFilter = new RegExp(filter.trim(), 'i'),
    filteredDatas = unFilteredDatas?.filter((data) =>
      Object.values(data).some((value) => typeof value === 'string' && value.match(insensitiveFilter)),
    )

  if (filter.trim() === '') return unFilteredDatas

  return filteredDatas
}
