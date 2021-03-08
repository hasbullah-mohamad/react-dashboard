import React, { Component } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetch, fetchData, fetchInstance, fetchOptions, create, update, partialUpdate, destroy } from '../actions/reduxActions'


function withRedux(WrappedComponent, {reducer, name, endpoint, query, title, hoc, ...options}) {
  class ReduxComponent extends Component {

    render() {
      
      return (
        <WrappedComponent {...options} {...this.props} title={title} />
      )
    }
  }

  function mapStateToProps(state) {
    return {
      data: state[reducer][name],
      options: state[reducer][`${name}Options`],
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      handleFetch: bindActionCreators((newQuery) => fetch(reducer, name, endpoint, {...query, ...newQuery}), dispatch),
      handleFetchData: bindActionCreators((newQuery) => fetchData(reducer, name, endpoint, {...query, ...newQuery}), dispatch),
      handleFetchInstance: bindActionCreators((newQuery) => fetchInstance(reducer, name, endpoint, {...query, ...newQuery}), dispatch),
      handleFetchOptions: bindActionCreators((newQuery) => fetchOptions(reducer, name, endpoint, {...query, ...newQuery}), dispatch),
      handleCreate: bindActionCreators((data, newQuery) => create(reducer, name, endpoint, {...query, ...newQuery}, data), dispatch),
      handleUpdate: bindActionCreators((data, newQuery) => update(reducer, name, endpoint, {...query, ...newQuery}, data), dispatch),
      handlePartialUpdate: bindActionCreators((data, newQuery) => partialUpdate(reducer, name, endpoint, {...query, ...newQuery}, data), dispatch),
      handleDestroy: bindActionCreators((data, newQuery) => destroy(reducer, name, endpoint, {...query, ...newQuery}, data), dispatch),
    };
  }

  if (hoc) {
    return connect(
      mapStateToProps,
      mapDispatchToProps
    )(hoc(ReduxComponent));
  } else {
    return connect(
      mapStateToProps,
      mapDispatchToProps
    )(ReduxComponent);
  }


}

export default withRedux
