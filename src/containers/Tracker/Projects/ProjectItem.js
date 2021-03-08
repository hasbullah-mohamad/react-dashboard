import React from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Col } from 'reactstrap';

import Event from '../Events/EventItem'
import Edit from './ProjectAddEdit'

import { deleteProject } from '../actions';


class Item extends React.Component {

  state = {
    showEvents: false,
    showInfo: false,
    editable: false,
  }

  handleDelete = (e) => {
    e.preventDefault()
    if (window.confirm(`Are you sure you want to delete this project: ${this.props.item.name}?`)) {
      this.props.onProjectDelete(this.props.item)
    }
  }

  toggleEvents = (e) => {
    e.preventDefault()
    this.setState({ showEvents: !this.state.showEvents, showInfo: false })
  }

  toggleInfo = (e) => {
    e.preventDefault()
    this.setState({ showInfo: !this.state.showInfo, showEvents: false })
  }

  toggleEdit = (e) => {
    e && e.preventDefault()
    this.setState({ editable: !this.state.editable, showInfo: false, showEvents: false })
  }

  render() {
    const { item } = this.props;

    const itemColor = item.clientNested && item.clientNested.color && JSON.parse(item.clientNested.color)
    const backgroundStyle = itemColor ? { backgroundColor: `rgba(${itemColor.r}, ${itemColor.g}, ${itemColor.b}, ${itemColor.a})` } : null

    const totalMinutes = this.props.events.reduce((a, b) => a + b.minutes, 0)

    return (
      <Card>
        { !this.state.editable ?
          <CardHeader style={ backgroundStyle }>
            <Row>
              <Col md>
                { item.name }
              </Col>
              <Col md>
                {
                  item.client ?
                  item.client.name :
                  'No Client'
                }
              </Col>
              <Col md>
                { Math.floor(totalMinutes / 60) }hrs{ totalMinutes % 60 }
              </Col>
              <Col md>
                <div className="pull-right">
                  <div className="d-flex flex-wrap align-items-end-md">
                    <a
                      href="#nolink"
                      className="p-1 ml-auto"
                      onClick={this.toggleEvents}
                    >
                      <i className="fa fa-sitemap fa-lg"></i>
                    </a>
                    <a
                      href="#nolink"
                      className="p-1 ml-auto"
                      onClick={this.toggleInfo}
                    >
                      <i className="fa fa-info-circle fa-lg"></i>
                    </a>
                    <a
                      href="#nolink"
                      className="p-1 ml-auto"
                      onClick={this.toggleEdit}
                    >
                      <i className="fa fa-edit fa-lg"></i>
                    </a>
                    <a
                      href="#nolink"
                      className="p-1 ml-auto"
                      onClick={this.handleDelete}
                    >
                      <i className="fa fa-trash fa-lg"></i>
                    </a>
                  </div>
                </div>
              </Col>
            </Row>
          </CardHeader> :
          <Edit item={item} toggleEdit={this.toggleEdit} />
        }
        {
          this.state.showInfo &&
          <CardBody>
            <div>
              Last event date: {
                item.lastDate &&
                (new Date(item.lastDate)).toLocaleString()
              }
            </div>
            {
              item.billingType === 'quote' ?
              <div>Quote: { item.quote }</div> :
              item.billingType === 'rate' ?
              <div>Rate: { item.rate }</div> : null
            }
            {
              item.billingType &&
              item.billingType === 'quote' ?
              <div>Billable: { item.quote }</div> :
              item.billingType === 'rate' ?
              <div>Billable: { (item.rate * totalMinutes / 60).toFixed(2) }</div> : null
            }
          </CardBody>
        }

        {
          this.state.showEvents &&
          this.props.events
          .map(event => {
            return <Event key={event.id} event={event} description/>
          })
        }

      </Card>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    events: state.tracker.events.filter(event => event.project === ownProps.item.id)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onProjectDelete: bindActionCreators(deleteProject, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item)

