import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import CreatableSelect from 'react-select/lib/Creatable';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchProjects, updateProject, createProject, deleteProject } from '../../actions'

import {
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

import ProjectAddModal from '../../Projects/ProjectAddModal'


class EventModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projectOptions: this.projectsToSelectOptions(props.projects),
      showProjectCreateModal: false,
      newProjectName: null,
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      projectOptions: this.projectsToSelectOptions(props.projects)
    });
  }

  componentDidMount() {
    this.props.handleProjectsFetch()
  }

  projectsToDropdown = (projects) => {
    return projects.map((project) => ({
      key: project.id,
      value: String(project.id),
      text: project.client ? `${project.name} - ${project.clientNested.name}` : project.name,
    }))
  }

  projectsToSelectOptions = (projects) => {
    return projects.map((project) => {
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

  projectToSelectOption =  (projectId) => {
    const { projectOptions } = this.state;
    let option = projectOptions.find((option) => {
      return parseInt(option.value) === parseInt(projectId)
    });
    return option;
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        onClose={this.props.closeModal}
      >

        {
          this.state.showProjectCreateModal &&
          <ProjectAddModal
            modalIsOpen={this.state.showProjectCreateModal}
            closeModal={this.toggleProjectCreateModal}
            projectName={this.state.newProjectName}
          />
        }

        <ModalHeader className="d-inline">
          Event
          <button type="button" className="close" aria-label="Close" onClick={this.props.closeModal}>
            <span aria-hidden="true">&times;</span>
          </button>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label htmlFor={"formControlInputName"}>Description</Label>
            <Input
              type="string"
              name="description"
              className="form-control"
              id="formControlInputName"
              value={this.props.data.description || ''}
              onChange={this.props.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor={"formControlInputName"}>Project</Label>
            <CreatableSelect
              classNamePrefix="react-select"
              placeholder="Projects"
              isClearable
              options={this.state.projectOptions}
              value={this.projectToSelectOption(this.props.data.project)}
              onChange={this.handleProjectChange}
              onCreateOption={this.handleProjectCreate}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor={"formControlInputName"}>Start</Label>
            <input
              name="start"
              type="datetime-local"
              className="form-control"
              value={this.props.data.start}
              onChange={this.props.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor={"formControlInputName"}>End</Label>
            <input
              name="end"
              type="datetime-local"
              className="form-control"
              value={this.props.data.end}
              onChange={this.props.handleChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-primary mr-auto"
            onClick={this.props.handleSubmit}
          >Submit</button>
          { this.props.data.id &&
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.props.handleDelete || this.props.closeModal}
            >Delete</button>
          }
        </ModalFooter>
      </Modal>
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
    handleProjectsFetch: bindActionCreators(fetchProjects, dispatch),
    handleProjectUpdate: bindActionCreators(updateProject, dispatch),
    handleProjectCreate: bindActionCreators(createProject, dispatch),
    handleProjectDelete: bindActionCreators(deleteProject, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventModal);
