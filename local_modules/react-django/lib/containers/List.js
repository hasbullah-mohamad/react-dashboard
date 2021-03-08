import React from 'react';
import { Card, CardBody, CardHeader, Table } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

import { TableHeader, TableBody, TableRow } from '../components'
import { Filter } from '../components'
import { Search, Pagination } from '../components'


const ListFilter = withRouter(({ title, options, getfilteredData, handleFilter, editable, historyClick, match }) => {
  return (
    <div>
      <Filter handleFilter={handleFilter} />
      <Card>
        <CardHeader>
          <i className="fa fa-align-justify"></i> { title || options.name }
          
          <Link to={`${match.url}/add`} className="pull-right">
            <i className="fa fa-plus-square-o fa-lg"></i>
          </Link>

        </CardHeader>
        <CardBody>
          <Table responsive hover>
            
            <TableHeader options={options.actions.POST} />

            <TableBody
              data={getfilteredData()}
              options={options.actions.POST}
            >
              <TableRow editable={editable} historyClick={historyClick}/>
            </TableBody>

          </Table>
        </CardBody>
      </Card>
    </div>
  )
})

const ListSearch = withRouter(({ data, options, page, title, searchParams, handleAddSearchParam, handleSearchSubmit, handleRemoveSearchParam, handleRangeSearchParam, handlePage, editable, historyClick, match }) => {
  


  const pageCount = getPageCount({data, page})

  if (Object.keys(options).length === 0 && options.constructor === Object) {
    return <div>Loading...</div>
  }

  let results = []
  if (data) {
    results = data.results
  }

  return (
    <div>
      <Search 
        searchParams={searchParams} 
        handleSearchSubmit={handleSearchSubmit}
        handleRemoveSearchParam={handleRemoveSearchParam} 
        handleRangeSearchParam={handleRangeSearchParam} 
      />
      <Card>
        <CardHeader>

          <i className="fa fa-align-justify"></i> { title || options.name }

          <Link to={`${match.url}/add`} className="pull-right">
            <i className="fa fa-plus-square-o fa-lg"></i>
          </Link>

        </CardHeader>
        <CardBody>
          <Pagination
            page={page} 
            pageCount={pageCount} 
            handleChange={handlePage}
          />

          <Table responsive hover>
            
            <TableHeader 
              options={options.actions.POST} 
              search={true}
              handleAddSearchParam={handleAddSearchParam}
            />

            <TableBody
              data={results}
              options={options.actions.POST}
            >
              <TableRow editable={true}/>
            </TableBody>

          </Table>
        </CardBody>
      </Card>
    </div>
  )
})

function getPageCount({data, page}) {
  if (typeof(data) !== 'undefined') {
    let pageCount = Math.ceil(data.count / 100);
    if (pageCount === 0) {pageCount = 1}
    return pageCount
  } else {
    return page
  }
}

const List = (props) => {
  if (props.filterType === 'search') {
    return <ListSearch {...props} />
  } else {
    return <ListFilter {...props} />
  }
}

export default List