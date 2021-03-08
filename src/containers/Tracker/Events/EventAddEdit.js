import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CardBody } from 'reactstrap';
import { Label, Input, Form } from 'reactstrap';
import CreatableSelect from 'react-select/lib/Creatable';

import ProjectAddModal from '../Projects/ProjectAddModal'

import { fetchEvents, updateEvent, createEvent, deleteEvent } from '../actions'

const initialSelected = {
  description: "",
  project: "",
  start: "",
  end: ""
}

class Add extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projectOptions: this.projectsToSelectOptions(props.projects),
      selected: { ...(this.props.item || initialSelected) },
      isEdit: this.props.item ? true : false,
      showProjectCreateModal: false,
      newProjectName: null,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      projectOptions: this.projectsToSelectOptions(props.projects)
    });
  }

  handleChange = (event) => {
    const selected = this.state.selected;

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    selected[name] = value;

    this.setState({ selected })
  }

  projectsToSelectOptions = (projects) => {
    const dropdownProjects = projects.map((project) => {
      const {
        id,
        name = "",
        client,
        clientNested = {},
      } = project;
      return ({
        value: String(id),
        label: client ? `${name} - ${clientNested.name}` : name
      })
    })

    return dropdownProjects
  }

  projectToSelectOption =  (projectId) => {
    const { projectOptions } = this.state;
    let option = projectOptions.find((option) => {
      return parseInt(option.value) === parseInt(projectId)
    });
    return option;
  }

  handleProjectChange = (data) => {
    if (data) {
      this.setState({
        selected: {
          ...this.state.selected,
          project: data.value
        }
      })
    } else {
      this.setState({
        selected: {
          ...this.state.selected,
          project: null
        }
      })
    }
  }

  handleProjectCreate = (inputValue: any) => {
    this.setState({
      showProjectCreateModal: true,
      newProjectName: inputValue
    })
  }

  toggleProjectCreateModal = () => {
    this.setState({
      showProjectCreateModal: !this.state.showProjectCreateModal
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    let { selected } = this.state;

    if (new Date(selected.start) <= new Date(selected.end)) {

      if (selected.id) {
        this.props.handleEventUpdate(selected)
      } else {
        this.props.handleEventCreate(selected)
      }

      this.state.isEdit ?
      this.props.toggleEdit() :
      this.setState({ selected: { ...initialSelected } })
    }
  }

  handleClose = (e) => {
    e.preventDefault()
    this.setState({ selected: this.props.item })
    this.props.toggleEdit()
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {
          this.state.showProjectCreateModal &&
          <ProjectAddModal
            modalIsOpen={this.state.showProjectCreateModal}
            closeModal={this.toggleProjectCreateModal}
            projectName={this.state.newProjectName}
          />
        }

        <CardBody>
          <div className="d-block d-md-flex flex-row align-items-center">

            <Label for="description" hidden>Description</Label>
            <Input
              type="string"
              name="description"
              id="description"
              placeholder="Description"
              className="mr-2 mb-2 mb-md-0"
              value={this.state.selected.description}
              onChange={this.handleChange}
            />

            <Label for="project" hidden>Project</Label>
            <CreatableSelect
              classNamePrefix="react-select"
              className="w-100 mr-2 mb-2 mb-md-0"
              placeholder='Project'
              isClearable
              options={this.state.projectOptions}
              value={this.projectToSelectOption(this.state.selected.project)}
              onChange={this.handleProjectChange}
              onCreateOption={this.handleProjectCreate}
            />

            <Label for="project" hidden>Start</Label>
            <Input
              type="datetime-local"
              name="start"
              id="start"
              placeholder="Start"
              className="mr-2 mb-2 mb-md-0"
              value={this.state.selected.start}
              onChange={this.handleChange}
            />

            <Label for="project" hidden>End</Label>
            <Input
              type="datetime-local"
              name="end"
              id="end"
              placeholder="End"
              className="mr-2 mb-2 mb-md-0"
              value={this.state.selected.end}
              onChange={this.handleChange}
            />

            { this.state.isEdit ? (
              <div className="d-flex justify-content-center ml-auto mt-3 mt-md-0">
                <a
                  href="#submit"
                  className="mr-2"
                  onClick={this.handleSubmit}
                >
                  <i className="fa fa-check fa-lg"></i>
                </a>

                <a
                  href="#close"
                  onClick={this.handleClose}
                >
                  <i className="fa fa-times fa-lg"></i>
                </a>
              </div>
            ) : (
              <a
                href="#submit"
                className="ml-auto mt-3 mt-md-0 d-flex justify-content-center"
                onClick={this.handleSubmit}
              >
                <i className="fa fa-plus-square-o fa-lg"></i>
              </a>
            )
          }

          </div>
        </CardBody>
      </Form>
    )
  }

}

function mapStateToProps(state) {
  return {
    projects: state.tracker.projects || [],
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
)(Add)
