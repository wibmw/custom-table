# Custom Table

An Easy React Customizable Table component with integrated filter search, column sort and pagination.

[NPM-url]

## 🚀 Getting Started

Using [`yarn`]():

```bash
yarn add @wibmw\custom-table
```

## ✨ Usage

How to use `Table` in your project:

```javascript
import { Table } from 'custom-table'
import Loading from '../../images/loading.png'

export default () => {

  return (
   <>
      {/** *********** Page ******************/}
      <main className='...'>
        <section className='...'>
          {/** *********** Table ******************/}
          {employeesList.length ? (
            // If the employees List is loaded, display the Table
            <Table title='Employees List' tableDatas={employeesList} columns={columns} />
          ) : (
            // Else display the loading Gif
            <img src={Loading} alt='wait until the page loads' />
          )}
        </section>
      </main>
    </>
  )
}

// Table Datas
const employeesList = [
  {
    "firstName": "tony",
    "lastName": "stark",
    "birthDate": "2015-02-03",
    "street": "Avenue du Dev",
    "city": "Paris",
    "zipCode": "75019"
  },
]

// Table Columns List
const columns = [
  { label: 'First Name', accessor: 'firstName', sortable: true, className: 'textLeft' },
  { label: 'Last Name', accessor: 'lastName', sortable: true, className: 'textLeft' },
  { label: 'Date of Birth', accessor: 'birthDate', sortable: true, className: 'date' },
  { label: 'Street', accessor: 'street', sortable: false, className: 'textLeft' },
  { label: 'City', accessor: 'city', sortable: true, className: 'textLeft' },
  { label: 'Zip Code', accessor: 'zipCode', sortable: true, className: 'textRight' },
]

```

## 📌 Table Props

| Prop         | Type        | Default | Required |
| ------------ | ----------- | ------- | -------- |
| `title`      | String      |         | Yes      |
| `tableDatas` | ITableDatas |         | Yes      |
| `columns`    | IColumns    |         | Yes      |


## ✌️ License
[MIT](https://opensource.org/licenses/MIT)

[NPM-url]: https://www.npmjs.com/package/@wibmw/custom-table
