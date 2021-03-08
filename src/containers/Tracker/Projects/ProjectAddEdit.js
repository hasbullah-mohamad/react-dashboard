import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { CardBody, CardFooter } from 'reactstrap';
import { Label, Input, Form, FormGroup } from 'reactstrap';
import CreatableSelect from 'react-select/lib/Creatable';

import {
  fetchProjects,
  updateProject,
  createProject,
  deleteProject,
  fetchClients,
  createClient,
} from '../actions';


const initialSelected = {
  name: "",
  client: null,
  quote: null,
  rate: null,
  workspace: null,
  billingType: "",
}

class AddProject extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      clientOptions: this.clientsToSelectOptions(props.clients),
      selected: { ...(this.props.item || initialSelected) },
      isEdit: this.props.item ? true : false,
      showAdditionalInfoButton: false,
      showAdditionalInfo: false,
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      clientOptions: this.clientsToSelectOptions(props.clients)
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
    console.log('testsasdfa')
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

  handleClose = (e) => {
    e.preventDefault()
    this.setState({ selected: this.props.item })
    this.props.toggleEdit()
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

  toggleAdditionalInfo = () => {
    this.setState({ showAdditionalInfo: !this.state.showAdditionalInfo })
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
      <Form onSubmit={this.handleSubmit}>
        <CardBody>
          <div className="d-block d-md-flex flex-row align-items-center">

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

            <Label for="project" hidden>Project</Label>
            <CreatableSelect
              classNamePrefix="react-select"
              placeholder="Client"
              className="w-100 mr-0 mr-md-4 mb-2 mb-md-0"
              options={this.state.clientOptions}
              value={this.clientToSelectOption(this.state.selected.client)}
              onChange={this.handleClientChange}
              onCreateOption={this.handleClientCreate}
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

        { (this.state.showAdditionalInfoButton || this.state.isEdit) &&
          <CardFooter
            className="bg-transparent"
            onClick={this.toggleAdditionalInfo}
          >
            <div className="text-center">
              Additional Info
            </div>
          </CardFooter>
        }

        { this.state.showAdditionalInfo &&
          <CardFooter className="bg-transparent">
            <FormGroup className="row mt-3">
              <Label htmlFor="billingType" className="col-sm-2 col-form-label">Billing Type</Label>
               <div className="col-sm-10">
                  <select
                    type="text"
                    name="billingType"
                    className="form-control"
                    id="billingType"
                    value={this.state.selected.billingType || ""}
                    onChange={this.handleChange}
                  >
                  <option value="">No billing</option>
                  <option value="quote">Quote</option>
                  <option value="rate">Rate</option>
                </select>
              </div>
            </FormGroup>
            { this.state.selected.billingType === 'quote' &&
              <FormGroup className="row">
                <Label htmlFor="billingType" className="col-sm-2 col-form-label">Quote</Label>
                <div className="col-sm-10">
                  <Input
                    type="number"
                    name="quote"
                    id="quote"
                    className="form-control"
                    value={this.state.selected.quote || ""}
                    onChange={this.handleChange}
                  />
                </div>
              </FormGroup>
            }
            { this.state.selected.billingType === 'rate' &&
              <FormGroup className="row">
                <Label htmlFor="billingType" className="col-sm-2 col-form-label">Rate</Label>
                <div className="col-sm-10">
                  <Input
                    type="number"
                    name="rate"
                    id="rate"
                    value={this.state.selected.rate || ""}
                    onChange={this.handleChange}
                  />
                </div>
              </FormGroup>
              }
          </CardFooter>
        }
      </Form>
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
    handleProjectsFetch: bindActionCreators(fetchProjects, dispatch),
    handleProjectUpdate: bindActionCreators(updateProject, dispatch),
    handleProjectCreate: bindActionCreators(createProject, dispatch),
    handleProjectDelete: bindActionCreators(deleteProject, dispatch),
    handleClientsFetch: bindActionCreators(fetchClients, dispatch),
    handleClientCreate: bindActionCreators(createClient, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProject)
