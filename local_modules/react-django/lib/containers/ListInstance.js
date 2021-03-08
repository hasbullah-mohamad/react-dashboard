import React from 'react';
import withRedux from '../hoc/withRedux'

import { Redirect } from 'react-router-dom';

import List from './List'
import Instance from './Instance'

import withFilter from '../hoc/withFilter'


class ListInstance extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reducer: (props.reducer || props.match.params.reducer),
      name: (props.name || props.match.params.name),
      title: (props.title || ''),
      filterType: (props.filterType || 'filter'),
      hoc: (props.hoc || withFilter),
    }
    this.WrappedList = withRedux(
      List,
      {
        reducer: this.state.reducer, 
        name: this.state.name, 
        endpoint: `${this.state.reducer}/${this.state.name}/`,
        query: {},
        title: this.state.title,
        hoc: this.state.hoc,
        editable: true,
        filterType: this.state.filter,
      }
    )
    this.WrappedInstance = withRedux(
      Instance,
      {
        reducer: this.state.reducer, 
        name: this.state.name, 
        endpoint: `${this.state.reducer}/${this.state.name}/${props.match.params.id}/`,
        query: {},
        title: `${this.state.title} Details`
      }
    )
  }

  selectComponent() {
    const { params } = this.props.match
    if (params.id) {
      return <this.WrappedInstance {...this.props} />
    } else if (params.reducer || params.name) {
      return <this.WrappedList {...this.props} />
    } else if (Object.keys(params).length === 0 && params.constructor === Object) {
      return <this.WrappedList {...this.props} />
    } else {
      return <Redirect to='/dashboard' />
    }
  }

  render() {
    if (this.state.reducer && this.state.name) {
      return this.selectComponent() 
    } else {
      return <Redirect to='/dashboard' />
    }
  }
}

export default ListInstance
