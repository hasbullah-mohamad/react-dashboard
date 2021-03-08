import React from 'react';

import { Col, FormGroup, InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';


const filter = props => (
  <FormGroup row>
    <Col md="6">
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <Button type="button" color="primary"><i className="fa fa-search"></i> Filter</Button>
        </InputGroupAddon>
        <Input 
          type="text" 
          id="input-filter" 
          name="input-filter" 
          placeholder="" 
          onChange={props.handleFilter} 
        />
      </InputGroup>
    </Col>
  </FormGroup>
)

export default filter