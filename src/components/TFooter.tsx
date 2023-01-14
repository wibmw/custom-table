import { ChangeEventHandler } from 'react'

const TableFooter = ({ setPage, page, range, setRangeScope }: IPropsTFooter) => {
  // OnRangeChange, update Range Scope state and set the active page to 1 to prevent issues
  const handleRangeChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setRangeScope(parseInt(event.target.value))
    setPage(1)
  }

  // If not on the first page, go on previous page
  const previousPage = () => (page === 1 ? null : setPage(page - 1))
  // If not on the last page, go on nextpage
  const nextPage = () => (page < range.length ? setPage(page + 1) : null)

  return (
    <>
      {/** *********** Pagination Footer ******************/}
      <div className='tableFooter'>
        {/** *********** Range Scope ******************/}
        <div className='rangeSelect'>
          <label htmlFor='range'>Range </label>
          <select id='range' name='range' onChange={handleRangeChange}>
            {rangeOptions.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.text}
              </option>
            ))}
          </select>
        </div>
        {/** *********** Buttons Sections ******************/}
        <div className='buttons'>
          {/** *********** Previous Button ******************/}
          <button
            key='previous'
            className={`button ${page > 1 ? 'activeButton' : 'inactiveButton'}`}
            onClick={() => previousPage()}
          >
            Previous
          </button>
          {/** *********** Pages Number Buttons ******************/}
          {range.map((pageNumber, index) => (
            <button
              key={index}
              className={`button ${page === pageNumber ? 'activeButton' : 'inactiveButton'}`}
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          {/** *********** Next Button ******************/}
          <button
            key='next'
            className={`button ${page < range.length ? 'activeButton' : 'inactiveButton'}`}
            onClick={() => nextPage()}
          >
            Next
          </button>
        </div>
        {/** *********** Active Page Information ******************/}
        <div className='pageNumber'>
          Page {range.length > 0 ? page : 0} of {range.length}
        </div>
      </div>
    </>
  )
}

export default TableFooter

// Interfaces
interface IPropsTFooter {
  sliceLength: number
  page: number
  range: number[]
  setPage: (page: number) => void
  setRangeScope: (range: number) => void
}

// Range Scope Values
const rangeOptions = [
  { value: 10, text: '10' },
  { value: 20, text: '20' },
  { value: 30, text: '30' },
  { value: 50, text: '50' },
  { value: 100, text: '100' },
]
