import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Card } from 'reactstrap';

import { fetchClients, fetchProjects, fetchEvents } from '../actions'

import Add from './ClientAddEdit'
import List from './ClientList'

class Clients extends React.Component {

  componentDidMount() {
    this.props.handleClientsFetch()
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
    items: state.tracker.clients
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleClientsFetch: bindActionCreators(fetchClients, dispatch),
    handleProjectsFetch: bindActionCreators(fetchProjects, dispatch),
    handleEventsFetch: bindActionCreators(fetchEvents, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Clients)
