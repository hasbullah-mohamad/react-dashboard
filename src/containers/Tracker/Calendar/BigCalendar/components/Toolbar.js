import PropTypes from 'prop-types'
import React from 'react'
import cn from 'classnames'
import { navigate } from 'react-big-calendar/lib/utils/constants'
import { CardHeader } from 'reactstrap';

class Toolbar extends React.Component {
  state = {
    calendarDropdownShow: false
  }

  static propTypes = {
    view: PropTypes.string.isRequired,
    views: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.node.isRequired,
    localizer: PropTypes.object,
    onNavigate: PropTypes.func.isRequired,
    onView: PropTypes.func.isRequired,
  }

  onNavigateNext = (event) => {
    event.preventDefault();
    this.navigate.bind(null, navigate.NEXT)()
  }

  onNavigatePrevious = (event) => {
    event.preventDefault();
    this.navigate.bind(null, navigate.PREVIOUS)()
  }

  onNavigateToday = (event) => {
    event.preventDefault();
    this.navigate.bind(null, navigate.TODAY)()
  }

  onView = (event, name) => {
    event.preventDefault();
    this.view.bind(null, name)()
    this.setState({ calendarDropdownShow: false })
  }

  toggleCalendarDropdown = (event) => {
    event.preventDefault();
    this.setState({ calendarDropdownShow: !this.state.calendarDropdownShow })
  }

  render() {
    let { localizer: { messages }, label } = this.props
    const { calendarDropdownShow } = this.state

    return (
      <CardHeader>

        <div className="d-md-none d-inline dropdown">
          <a
            href="#nolink"
            className="mr-1"
            onClick={this.toggleCalendarDropdown}
          >
            <i className="fa fa-calendar fa-lg"></i>
          </a>
          <div className={cn('dropdown-menu', { show: calendarDropdownShow })}>
            {this.viewNamesGroupDropdown(messages)}
          </div>
        </div>

        <div className="d-none d-md-inline">
          Calendar
        </div>

        <ul className="d-none d-md-inline nav ml-4">
          {this.viewNamesGroup(messages)}
        </ul>

        <div className="d-inline float-right">

          <span className="mr-3">
            {label}
          </span>

          <a
            href="#nolink"
            className="mr-2"
            onClick={this.onNavigatePrevious}
          >
            <i className="fa fa-chevron-circle-left fa-lg"></i>
          </a>

          <a
            href="#nolink"
            className="mr-2"
            onClick={this.onNavigateToday}
          >
            <i className="fa fa-bullseye fa-lg"></i>
          </a>

          <a
            href="#nolink"
            onClick={this.onNavigateNext}
          >
            <i className="fa fa-chevron-circle-right fa-lg"></i>
          </a>

        </div>

      </CardHeader>
    )
  }

  navigate = action => {
    this.props.onNavigate(action)
  }

  view = view => {
    this.props.onView(view)
  }

  viewNamesGroup(messages) {
    let viewNames = this.props.views
    const view = this.props.view

    if (viewNames.length > 1) {
      return viewNames.map(name => (
        <li
          className="d-inline nav-item"
          key={name}
        >
          <a
            href="#nolink"
            className={cn('d-inline', 'nav-link', { 'active': view === name })}
            onClick={(e) => {this.onView(e, name)}}
          >
            {messages[name]}
          </a>
        </li>

      ))
    }
  }

  viewNamesGroupDropdown(messages) {
    let viewNames = this.props.views
    const view = this.props.view

    if (viewNames.length > 1) {
      return viewNames.map(name => (
        <a
          href="#nolink"
          key={name}
          className={cn('dropdown-item', { 'active': view === name })}
          onClick={(e) => {this.onView(e, name)}}
        >
          {messages[name]}
        </a>
      ))
    }
  }
}

export default Toolbar
