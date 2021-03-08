import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Card } from 'reactstrap';

import Add from './ProjectAddEdit'
import List from './ProjectList'

import { fetchProjects, fetchEvents, fetchClients } from '../actions'


class Projects extends React.Component {
  componentDidMount() {
    this.props.handleProjectsFetch()
    this.props.handleEventsFetch()
    this.props.handleClientsFetch()
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
    handleClientsFetch: bindActionCreators(fetchClients, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects)
