import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Card } from 'reactstrap';

import Add from './EventAddEdit'
import List from './EventList'

import { fetchProjects, fetchEvents } from '../actions'


class Events extends React.Component {
  componentDidMount() {
    this.props.handleProjectsFetch()
    this.props.handleEventsFetch()
  }

  render() {
    return (
      <div>

        <Card>
          <Add />
        </Card>

        <List />

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleProjectsFetch: bindActionCreators(fetchProjects, dispatch),
    handleEventsFetch: bindActionCreators(fetchEvents, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events)
