import React from 'react';
import { Card, CardHeader } from 'reactstrap';

import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

import Event from './EventItem'

class Events extends React.Component {

  render() {
    const { events, day } = this.props;
    const dayEvents = events.filter(event => (new Date(event.start)).toDateString() === day)
    return (
      <Card>
        <CardHeader>
          { day }
        </CardHeader>

        {
          dayEvents.map((event) => {
            return (
              <Event key={event.id} event={event} />
            )
          })
        }

      </Card>
    )
  }
}

function mapStateToProps(state) {
  return {
    events: state.tracker.events
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     handleEventsFetch: bindActionCreators(fetchEvents, dispatch),
//   };
// }

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Events)

