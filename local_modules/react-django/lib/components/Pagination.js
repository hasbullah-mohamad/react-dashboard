import React from 'react';

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';


const pagination = props => (
  <Pagination>
    <PaginationItem disabled={ props.page === 1}>
      <PaginationLink 
        tag="button"
        onClick={() => props.handleChange(1 - props.page)} 
      >
        { props.page }
      </PaginationLink>
    </PaginationItem>
    <PaginationItem disabled={ props.page <= 1}>
      <PaginationLink 
        previous 
        tag="button" 
        onClick={() => props.handleChange(-1)} 
      />
    </PaginationItem>
    <PaginationItem disabled={ props.page >= props.pageCount }>
      <PaginationLink 
        next 
        tag="button" 
        onClick={() => props.handleChange(1)} 
      />
    </PaginationItem>
    <PaginationItem disabled={ props.page === props.pageCount }>
      <PaginationLink 
        tag="button"
        onClick={() => props.handleChange(props.pageCount - props.page)} 
      >
        { props.pageCount }
      </PaginationLink>
    </PaginationItem>
  </Pagination>
)

export default pagination