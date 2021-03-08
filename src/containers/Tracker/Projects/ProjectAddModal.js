import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Modal, ModalBody, ModalFooter, ModalHeader, Label, Input, FormGroup } from 'reactstrap';
import CreatableSelect from 'react-select/lib/Creatable';

import {
  createProject,
  fetchClients,
  createClient
} from '../actions';


const initialSelected = {
  name: "",
  client: null,
  quote: null,
  rate: null,
  workspace: null,
  billingType: "",
}

class ProjectAddModal extends React.Component {

  constructor(props) {
    super(props);

    const newInitialSelected = {
      ...initialSelected,
      name: props.projectName
    }

    this.state = {
      clientOptions: this.clientsToSelectOptions(props.clients),
      selected: { ...(this.props.item || newInitialSelected) },
      isEdit: this.props.item ? true : false,
      showAdditionalInfoButton: false,
      showAdditionalInfo: false,
    }
  }

  componentDidMount() {
    this.props.handleClientsFetch()
  }

  componentWillReceiveProps(props) {
    this.setState({
      clientOptions: this.clientsToSelectOptions(props.clients),
    });
  }

  handleChange = (project) => {
    const selected = this.state.selected;

    const target = project.target;
    const value = target.type === 'checkbox' ?
      target.checked :
      target.type === 'number' ?
      parseFloat(target.value) :
      target.value;

    const name = target.name;

    selected[name] = value;

    this.setState({ selected, showAdditionalInfoButton: true })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    let { selected } = this.state;

    if (selected.id) {
      this.props.handleProjectUpdate(selected)
    } else {
      this.props.handleProjectCreate(selected)
    }

    this.state.isEdit ?
    this.props.toggleEdit() :
    this.setState({ selected: { ...initialSelected } })
  }

  itemsToDropdown = (items) => {
    return items.map((item) => ({
      key: item.id,
      value: String(item.id),
      text: item.name
    }))
  }

  clientsToSelectOptions = (clients) => {
    return clients.map((client) => ({
      value: String(client.id),
      label: client.name
    }))
  }

  clientToSelectOption =  (clientId) => {
    const { clientOptions } = this.state;
    let option = clientOptions.find((option) => {
      return parseInt(option.value) === parseInt(clientId)
    });
    return option;
  }

  handleClientChange = (data) => {
    if (data) {
      this.setState({
        selected: {
          ...this.state.selected,
          client: data.value
        }
      })
    } else {
      this.setState({
        selected: {
          ...this.state.selected,
          client: null
        }
      })
    }
  }

  handleClientCreate = (inputValue: any) => {
    this.props.handleClientCreate({
      name: inputValue,
      color: "",
      workspace: null
    })
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        onClose={this.props.closeModal}
      >

        <ModalHeader className="d-inline">
          Add Project
          <button type="button" className="close" aria-label="Close" onClick={this.props.closeModal}>
            <span aria-hidden="true">&times;</span>
          </button>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="description" hidden>Description</Label>
            <Input
              type="string"
              name="name"
              id="name"
              placeholder="Project"
              className="mr-0 mr-md-4 mb-2 mb-md-0"
              value={this.state.selected.name}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="project" hidden>Project</Label>
            <CreatableSelect
              classNamePrefix="react-select"
              placeholder="Client"
              className="w-100 mr-0 mr-md-4 mb-2 mb-md-0"
              isClearable
              options={this.state.clientOptions}
              value={this.clientToSelectOption(this.state.selected.client)}
              onChange={this.handleClientChange}
              onCreateOption={this.handleClientCreate}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-primary mr-auto"
            onClick={this.handleSubmit}
          >Submit</button>
        </ModalFooter>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    clients: state.tracker.clients
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleProjectCreate: bindActionCreators(createProject, dispatch),
    handleClientsFetch: bindActionCreators(fetchClients, dispatch),
    handleClientCreate: bindActionCreators(createClient, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectAddModal)
