import React, { Component } from 'react';

function withFilter(WrappedComponent) {
  return class extends Component {

    constructor() {
      super();
      this.state = {
        value: '',
      }
      this.handleFilter = this.handleFilter.bind(this)
      this.getfilteredData = this.getfilteredData.bind(this)
    }

    componentDidMount() {
      this.props.handleFetch()
    }

    handleFilter(event) {
      this.setState({ value: event.target.value })
    }

    getfilteredData() {
      const { value } = this.state;
      const { data } = this.props;

      if (typeof(data) === 'undefined') {
        return []
      }
      
      return data.filter((item) => {
        return filterObject(item, value);
      });
    }

    render() {
      const undefinedObject = (obj) => (typeof(obj) === 'undefined')
      const emptyOject = (obj) => (Object.keys(obj).length === 0 && obj.constructor === Object)

      if (undefinedObject(this.props.options) || emptyOject(this.props.options)) {
        return <div>Loading...</div>
      }
      
      return (
        <WrappedComponent 
          getfilteredData={this.getfilteredData}
          handleFilter={this.handleFilter} 
          {...this.props} 
        />
      )
    }
  }
}

function filterObject(obj, filter) {
  if (!obj || typeof(obj) === "undefined") {
    return false
  }

  const values = Object.values(obj)
  return values.some( (value) => {
    if (typeof(value) === "object") {
      return filterObject(value, filter)
    } else {
      return (value.toString().toLowerCase().indexOf(filter.toLowerCase()) > -1)
    }
  })
}

export default withFilter
