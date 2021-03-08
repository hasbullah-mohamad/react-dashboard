import React, { Component } from 'react'

const queryString = require('qs');


function withSearch(WrappedComponent) {
  return class extends Component {

    constructor() {
      super();
      this.state = {
        queryParams: {'page': 1},
        searchParams: {},
      }
      this.handlePage = this.handlePage.bind(this);
      this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
      this.handleAddSearchParam = this.handleAddSearchParam.bind(this);
      this.handleRemoveSearchParam = this.handleRemoveSearchParam.bind(this);
      this.handleRangeSearchParam = this.handleRangeSearchParam.bind(this);
    }

    componentDidMount() {
      if (this.props.options) {
        this.getOptionsData()
      } else {
        this.props.handleFetchOptions()
        .then(() => {
          this.getOptionsData()
        })   
      }
    }
    
    getOptionsData() {
      this.createPaginationQuery(() => {
        this.createSearchParams(this.props.options.actions.POST, () => {
          const { search } = this.props.location;
          const query = queryString.parse(search.slice(1));
          this.props.handleFetchData(query)
        })      
      })
    }

    createPaginationQuery(callback) {
      let { queryParams } = this.state;
      const { search } = this.props.location;

      const query = queryString.parse(search.slice(1));

      if ('page' in query) {
        queryParams['page'] = parseInt(query['page'], 10); 
        this.setState({ queryParams }, callback);
      } else {
        callback();
      }
    }

    handlePage(change) {
      let { queryParams } = this.state;
      const { history } = this.props;
      queryParams['page'] += change;
      const query = queryString.stringify(queryParams);
      history.push({ search: `?${query}` });
      this.setState({ queryParams }, this.getOptionsData);
    }

    createSearchParams(options, callback) {
      let searchParams = {};
      for (let option in options) {
        searchParams[option] = options[option];
        searchParams[option]['value'] = '';
        searchParams[option]['show'] = false;
      }

      const { queryParams } = this.state;
      const { search } = this.props.location;
      const queries = queryString.parse(search.substr(1));

      for (let query in queries) {
        try {
          if (query.indexOf('__gte') > -1) {
            const name = query.substr(0, query.indexOf('__gte'))
            searchParams[`${name}__gte`] = Object.assign({}, searchParams[name]);
            searchParams[`${name}__gte`]['value'] = queries[query];
            searchParams[`${name}__gte`]['label'] = `${searchParams[name]['label']} From`;
            searchParams[`${name}__gte`]['show'] = true;
            queryParams[query] = queries[query]
          } else if (query.indexOf('__lte') > -1) {
            const name = query.substr(0, query.indexOf('__lte'))
            searchParams[`${name}__lte`] = Object.assign({}, searchParams[name]);
            searchParams[`${name}__lte`]['value'] = queries[query];
            searchParams[`${name}__lte`]['label'] = `${searchParams[name]['label']} To`;
            searchParams[`${name}__lte`]['show'] = true;
            queryParams[query] = queries[query]
          } else if (query.indexOf('__') > -1) {
            const nested = query.substr(0, query.indexOf('__'))
            const name = query.substr(query.indexOf('__') + 2)
            searchParams[`${nested}__${name}`] = Object.assign({}, searchParams[`${nested}_nested`]['children'][name]);
            searchParams[`${nested}__${name}`]['value'] = queries[query];
            searchParams[`${nested}__${name}`]['show'] = true;
            queryParams[query] = queries[query]
          } else {
            searchParams[query]['value'] = queries[query];
            searchParams[query]['show'] = true;
            queryParams[query] = queries[query]
          }
        } catch (err) {}
      }

      this.setState({ searchParams }, () => {
        callback();
      });
    }

    handleSearchSubmit(newSearchParams) {
      const { queryParams, searchParams } = this.state;
      const { history } = this.props;

      for (let searchKey in newSearchParams) {
        if (newSearchParams[searchKey]['show'] && newSearchParams[searchKey]['value'] !== '') {
          queryParams[searchKey] = newSearchParams[searchKey]['value'];
          searchParams[searchKey]['value'] = newSearchParams[searchKey]['value'];
        } else {
          delete queryParams[searchKey];
        }
      }

      queryParams['page'] = 1

      const query = queryString.stringify(queryParams);
      history.push({ search: `?${query}` });
      this.setState({ queryParams }, this.getOptionsData);
    }

    handleAddSearchParam(event) {
      event.preventDefault();
      const { searchParams } = this.state;
      const { name } = event.target;
      if (name.indexOf('__') > -1) {
        const nested = name.substr(0, name.indexOf('__'))
        const value = name.substr(name.indexOf('__') + 2)
        searchParams[`${nested}__${value}`] = Object.assign({}, searchParams[`${nested}_nested`]['children'][value]);
        searchParams[`${nested}__${value}`]['value'] = '';
        searchParams[`${nested}__${value}`]['show'] = true;
      } else {
        searchParams[name]['value'] = '';
        searchParams[name]['show'] = true;
      }
      
      this.setState({ searchParams });
    }

    handleRemoveSearchParam(event) {
      const { searchParams } = this.state;
      const { name } = event.target;
      searchParams[name]['value'] = '';
      searchParams[name]['show'] = false;

      this.setState({ searchParams }, () => {
        this.handleSearchSubmit(searchParams);
      });
    }

    handleRangeSearchParam(event) {
      const { searchParams } = this.state;
      const { name } = event.target;
      if (name.indexOf('__gte') === -1 && name.indexOf('__lte') === -1) {
        searchParams[name]['show'] = false;
        searchParams[`${name}__gte`] = Object.assign({}, searchParams[name]);
        searchParams[`${name}__gte`]['value'] = '';
        searchParams[`${name}__gte`]['label'] = `${searchParams[name]['label']} From`;
        searchParams[`${name}__gte`]['show'] = true;
        searchParams[`${name}__lte`] = Object.assign({}, searchParams[name]);
        searchParams[`${name}__lte`]['value'] = '';
        searchParams[`${name}__lte`]['label'] = `${searchParams[name]['label']} To`;
        searchParams[`${name}__lte`]['show'] = true;   
      } 

      this.setState({ searchParams });
    }

    render() {
      const undefinedObject = (obj) => (typeof(obj) === 'undefined')
      const emptyOject = (obj) => (Object.keys(obj).length === 0 && obj.constructor === Object)

      if (undefinedObject(this.props.options) || emptyOject(this.props.options)) {
        return <div>Loading...</div>
      }
      
      return (
        <WrappedComponent 
          searchParams={this.state.searchParams}
          handleAddSearchParam={this.handleAddSearchParam}
          handleRemoveSearchParam={this.handleRemoveSearchParam}
          handleRangeSearchParam={this.handleRangeSearchParam}
          handleSearchSubmit={this.handleSearchSubmit}
          page={this.state.queryParams.page}
          handlePage={this.handlePage}
          {...this.props} 
        />
      )
    }
  }
}

export default withSearch
