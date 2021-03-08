import React from 'react';
import { connect } from 'react-redux'

import Day from './EventListDay'

class Events extends React.Component {
  render() {
    const { events } = this.props;

    const days = events
      .sort((a, b) => {
        a = new Date(a.start)
        b = new Date(b.start)
        return a>b ? -1 : a<b ? 1 : 0;
      })
      .map(event => (new Date(event.start)).toDateString())

    const uniqueDays = days.filter((x, i, a) => a.indexOf(x) === i)

    return (
      <div>

        {
          uniqueDays.map((day) => {
            return <Day key={day} day={day}/>
          })
        }

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    events: state.tracker.events
  }
}

export default connect(
  mapStateToProps,
)(Events)
