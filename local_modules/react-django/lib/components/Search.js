import React from 'react';

import { Col, FormGroup, InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParams: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const searchParams = this.props.searchParams;
    this.setState({ searchParams })
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.searchParams!==this.props.searchParams){
      this.setState({searchParams: this.props.searchParams});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { searchParams } = this.state;
    this.props.handleSearchSubmit(searchParams)
  }

  handleChange(event) {
    const searchParams = this.state.searchParams;
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    searchParams[name]['value']  = value;
    this.setState({ searchParams });
  }

  render() {
    const { searchParams } = this.state;
    
    let searchKeys = Object.keys(searchParams);

    const searchBody = searchKeys.filter((searchKey, key) => {
      if (searchParams[searchKey]['show']) { return true }
      else { return null }
    }).map((searchKey, key) => (
      <FormGroup row key={key}>
        <Col md="6">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <span>
                <a 
                  name={ searchKey }
                  className="input-group-text" 
                  id="inputSearch" 
                  onClick={this.props.handleRangeSearchParam}
                  >{ searchParams[searchKey]['label'] }
                </a>
              </span>
            </InputGroupAddon>
            <Input 
              type={ searchParams[searchKey]['type'] === 'datetime' ? 'datetime-local' : searchParams[searchKey]['type']}
              name={ searchKey }
              className="form-control" 
              aria-label="Small" 
              aria-describedby="inputSearch" 
              value={ searchParams[searchKey]['value'] || '' }
              onChange={ this.handleChange }
              autoComplete="off"
            />
            <Button 
              type="button" 
              className="close" 
              aria-label="Close"
            >
              <a 
                name={ searchKey } 
                onClick={this.props.handleRemoveSearchParam}
              >&times;
              </a>
            </Button>
          </InputGroup>
        </Col>
      </FormGroup>
    ));

    return (
      <form onSubmit={this.handleSubmit}>
        { searchBody }
        { (searchBody.length) ? <button type="submit" className="btn btn-primary mb-3">Submit</button> : null }
      </form>
    )
  }
}

export default Search
