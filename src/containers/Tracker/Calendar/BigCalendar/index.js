import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import { Card } from 'reactstrap';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchEvents, updateEvent, createEvent, deleteEvent } from '../../actions'

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/en-gb";

import EventModal from '../EventModal'

import Toolbar from './components/Toolbar'
import withDragAndDrop from './components/withDragAndDrop'

moment.locale('en-GB');
const localizer = BigCalendar.momentLocalizer(moment);

const DnDCalendar = withDragAndDrop(BigCalendar);


const MonthEventTest = ({ event }) => {
  return (
    <div>
      {
        event.project ? (
        event.projectNested.client ?
        `${event.projectNested.name} - ${event.projectNested.clientNested.name}` :
        event.projectNested.name ) :
        event.description
      }
    </div>
  )
}

class App extends Component {

  state = {
    selectedEvent: null,
    modalIsOpen: false,
    changedEvent: null,
  }

  componentDidMount() {
    this.props.handleEventFetch()
  }

  onEventResize = ({ event, start, end, allDay }) => {
    const updatedEvent = { ...event, start, end, allDay }
    this.props.handleEventUpdate(updatedEvent)
  }

  onEventDrop = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    let allDay = event.allDay

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false
    }

    const updatedEvent = { ...event, start, end, allDay }

    this.props.handleEventUpdate(updatedEvent)
  }

  onSelectEvent = (event) => {
    this.setState({
      selectedEvent: {
        ...event,
        start: moment(event.start).format('YYYY-MM-DDTHH:mm'),
        end: moment(event.end).format('YYYY-MM-DDTHH:mm'),
      },
      modalIsOpen: true
    })
  }

  onSelectSlot = (event) => {
    if (event.action === 'select') {

      let selectedEvent = {
        start: moment(event.start).format('YYYY-MM-DDTHH:mm'),
        end: moment(event.end).format('YYYY-MM-DDTHH:mm'),
      }

      const startBeginStartOfDay = moment(event.start).format('YYYY-MM-DDTHH:mm') === moment(event.start).startOf('day').format('YYYY-MM-DDTHH:mm')
      const endBeginStartOfDay = moment(event.end).format('YYYY-MM-DDTHH:mm') === moment(event.end).startOf('day').format('YYYY-MM-DDTHH:mm')

      if (startBeginStartOfDay && endBeginStartOfDay) {
        selectedEvent.end = moment(event.end).add(1, 'days').format('YYYY-MM-DDTHH:mm')
      }

      this.setState({
        selectedEvent: selectedEvent,
        modalIsOpen: true
      })
    }
  }

  handleEventChange = (event) => {
    const selectedEvent = { ...this.state.selectedEvent };

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    selectedEvent[name] = value;

    this.setState({ selectedEvent })
  }

  handleEventDelete = () => {
    if (this.state.selectedEvent.id) {
      if (window.confirm('Are you sure you want to delete this event?')) {
        this.props.handleEventDelete(this.state.selectedEvent)
        this.setState({ modalIsOpen: false, selectedEvent: null })
      }
    }

  }

  handleEventSubmit = () => {
    let selectedEvent = { ...this.state.selectedEvent };

    if (new Date(selectedEvent.start) <= new Date(selectedEvent.end)) {

      if (selectedEvent.id) {
        this.props.handleEventUpdate(selectedEvent)
      } else {
        this.props.handleEventCreate(selectedEvent)
      }
      this.setState({ modalIsOpen: false, selectedEvent: null })
    }
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  eventStyleGetter = (event) => {
    const itemColor = event && event.projectNested && event.projectNested.clientNested && event.projectNested.clientNested.color && JSON.parse(event.projectNested.clientNested.color)
    const backgroundStyle = itemColor ? { backgroundColor: `rgba(${itemColor.r}, ${itemColor.g}, ${itemColor.b}, ${itemColor.a})` } : null

    return {
        style: backgroundStyle
    };
  }

  render() {
    return (
      <Card style={{"height": "100%"}}>

          <DnDCalendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            views={["month", "week", "day"]}
            events={
              this.props.events.map((event) => ({
                ...event,
                start: new Date(event.start),
                end: new Date(event.end),
              }))
            }
            onEventDrop={this.onEventDrop}
            onEventResize={this.onEventResize}
            onSelectEvent={this.onSelectEvent}
            resizable
            style={{ height: "100%" }}
            step={15}
            timeslots={8}
            popup
            selectable
            onSelectSlot={this.onSelectSlot}
            eventPropGetter={(this.eventStyleGetter)}
            components={{
              event: MonthEventTest,
              toolbar: Toolbar,
            }}
            toolbar={true}
            selected={null}
          />

          {
            this.state.selectedEvent &&
            <EventModal
              data={this.state.selectedEvent}
              modalIsOpen={this.state.modalIsOpen}
              closeModal={this.closeModal}
              handleChange={this.handleEventChange}
              handleSubmit={this.handleEventSubmit}
              handleDelete={this.handleEventDelete}
            />
          }

      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.tracker.events || [],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleEventFetch: bindActionCreators(fetchEvents, dispatch),
    handleEventUpdate: bindActionCreators(updateEvent, dispatch),
    handleEventCreate: bindActionCreators(createEvent, dispatch),
    handleEventDelete: bindActionCreators(deleteEvent, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
