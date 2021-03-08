import React from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Col } from 'reactstrap';

import Project from '../Projects/ProjectItem'
import ClientAddEdit from './ClientAddEdit'

import { deleteClient } from '../actions'


class ClientItem extends React.Component {
  state = {
    showProjects: false,
    showInfo: false,
    editable: false,
  }

  handleDelete = (e) => {
    e.preventDefault()
    if (window.confirm(`Are you sure you want to delete this client: ${this.props.item.name}?`)) {
      this.props.onClientDelete(this.props.item)
    }
  }

  toggleProjects = (e) => {
    e.preventDefault()
    this.setState({ showProjects: !this.state.showProjects, showInfo: false })
  }

  toggleInfo = (e) => {
    e.preventDefault()
    this.setState({ showInfo: !this.state.showInfo, showProjects: false })
  }

  toggleEdit = (e) => {
    e && e.preventDefault()
    this.setState({ editable: !this.state.editable, showInfo: false, showProjects: false })
  }

  render() {
    const { item } = this.props;

    const itemColor = item.color ? JSON.parse(item.color) : null
    const backgroundStyle = itemColor ? { backgroundColor: `rgba(${itemColor.r}, ${itemColor.g}, ${itemColor.b}, ${itemColor.a})` } : null

    const totalMinutes = this.props.events.reduce((a, b) => a + b.minutes, 0)

    const orderedProjects = this.props.projects.sort((a, b) => {
      a = new Date(a.lastDate)
      b = new Date(b.lastDate)
      return a>b ? -1 : a<b ? 1 : 0;
    }).map(project => {
      const minutes = this.props.events.filter(
        event => event.project === project.id
      ).reduce((a, b) => a + b.minutes, 0)
      return { ...project, minutes }
    })

    const billable = orderedProjects.reduce((a, b) => {
      if (b.billingType) {
        if (b.billingType === 'quote') {
          return a + Number(b.quote)
        } else if (b.billingType === 'rate') {
          return a + Number(b.rate) * Number(b.minutes) / 60
        }
      }
      return a
    }, 0).toFixed(2)

    return (
      <React.Fragment>
        <Card>
          { !this.state.editable ?
          <CardHeader style={ backgroundStyle }>
            <Row>
              <Col md>
                { item.name }
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
                        onClick={this.toggleProjects}
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
          </CardHeader>:
          <ClientAddEdit item={item} toggleEdit={this.toggleEdit} />
        }
        {
          this.state.showInfo &&
          <CardBody>
            <div>
              Last event date: {
                orderedProjects[0].lastDate &&
                (new Date(orderedProjects[0].lastDate)).toLocaleString()
              }
            </div>
            <div>Billable: { billable }</div>
          </CardBody>
        }

        </Card>

        <div className="ml-2">
         {
          this.state.showProjects &&
          orderedProjects.map(project => {
            return <Project key={project.id} item={project} description/>
          })
        }
        </div>

      </React.Fragment>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    projects: state.tracker.projects.filter(event => event.client === ownProps.item.id),
    events: state.tracker.events.filter(event => event.projectNested.client === ownProps.item.id),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onClientDelete: bindActionCreators(deleteClient, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientItem)

