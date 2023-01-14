import React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import Table from '../src/components/Table'

describe('Common render', () => {
  it('renders without crashing', () => {
    render(
      <React.Fragment>
        <Table title='Sales Account' tableDatas={salesAccount} columns={columns} />
      </React.Fragment>,
    )
  })
})

const columns = [
  { label: 'Customer', accessor: 'customer', sortable: true, className: 'textLeft' },
  { label: 'Total', accessor: 'total', sortable: true, className: 'textLeft' },
]

const salesAccount = [
  { customer: 'Sony', total: 5230 },
  { customer: 'Apple', total: 9810 },
]
