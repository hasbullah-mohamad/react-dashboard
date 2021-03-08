import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { CardBody } from 'reactstrap';
import { Label, Input } from 'reactstrap';
import { fetchClients, updateClient, createClient, deleteClient } from '../actions';

import ColorPicker from './components/colorPicker'


const initialSelected = {
  name: "",
  color: "",
  workspace: null
}

class Add extends React.Component {

  state = {
    selected: { ...(this.props.item || initialSelected) },
    isEdit: this.props.item ? true : false,
  }

  handleChange = (event) => {
    const selected = this.state.selected;

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    selected[name] = value;

    this.setState({ selected })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    let { selected } = this.state;
    selected.workspace = 1;
    if (selected.id) {
      this.props.handleClientUpdate(selected)
    } else {

      this.props.handleClientCreate(selected)
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

  render() {
    return (
      <React.Fragment>
        <CardBody>
          <div className="d-block d-md-flex flex-row align-items-center">

            <Label for="description" hidden>Description</Label>
            <Input
              type="string"
              name="name"
              id="name"
              placeholder="Client"
              className="mr-md-4 mb-2 mb-md-0"
              value={this.state.selected.name}
              onChange={this.handleChange}
            />

            <ColorPicker onChange={this.handleChange} color={this.state.selected.color}/>

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
    handleClientsFetch: bindActionCreators(fetchClients, dispatch),
    handleClientUpdate: bindActionCreators(updateClient, dispatch),
    handleClientCreate: bindActionCreators(createClient, dispatch),
    handleClientDelete: bindActionCreators(deleteClient, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Add)
