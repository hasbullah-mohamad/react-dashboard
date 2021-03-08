import React from 'react';
import { CardBody } from 'reactstrap';
import { Col, Row } from 'reactstrap';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Edit from './EventAddEdit'

import { deleteEvent } from '../actions'


class Event extends React.Component {

  state = {
    editable: false,
  }

  handleDelete = (e) => {
    e.preventDefault()
    if (window.confirm(`Are you sure you want to delete this event: ${this.props.description}?`)) {
      this.props.handleEventDelete(this.props.event)
    }
  }

  toggleEdit = (e) => {
    e && e.preventDefault()
    this.setState({ editable: !this.state.editable })
  }

  render() {
    const { event } = this.props;
    return (
      <React.Fragment>
        {
          !this.state.editable ? (
          <CardBody>
            <Row>
              {
                this.props.description ? (
                  event.description ?
                  <Col md>
                    { event.description }
                  </Col> :
                  <Col md>
                    No description
                  </Col>
                ) :
                event.project ?
                <Col md>
                  { event.projectNested.name }
                </Col> :
                <Col md>
                  { event.description }
                </Col>
              }
              <Col md>
                { (new Date(event.start)).toLocaleString() }
              </Col>
              <Col md>
                { event.end &&
                  (new Date(event.end)).toLocaleString()
                }
              </Col>
              <Col md>
                { Math.floor(event.minutes / 60) }hrs{ event.minutes % 60 }
              </Col>
              <Col md>
                <div className="pull-right">
                  <div className="d-flex flex-wrap align-items-end-md">
                    <a
                      href="#edit"
                      className="p-1 ml-auto"
                      onClick={this.toggleEdit}
                    >
                      <i className="fa fa-edit fa-lg"></i>
                    </a>
                    <a
                      href="#delete"
                      className="p-1 ml-auto"
                      onClick={this.handleDelete}
                    >
                      <i className="fa fa-trash fa-lg"></i>
                    </a>
                  </div>
                </div>
              </Col>
            </Row>
          </CardBody>
          ) :
            <Edit item={event} toggleEdit={this.toggleEdit} />
        }
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleEventDelete: bindActionCreators(deleteEvent, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Event)

