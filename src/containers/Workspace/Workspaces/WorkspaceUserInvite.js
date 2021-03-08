import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
  Button,
  Form, FormGroup, Label
} from 'reactstrap';

import Select from 'react-select';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import { createWorkspaceUser } from '../actions';
import WorkspaceHelper from './WorkspaceHelper';

class WorkspaceUserInvite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      userOptions: WorkspaceHelper.getUserOptions(props.users)
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      userOptions: WorkspaceHelper.getUserOptions(props.users)
    });
  }

  handleToggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleUserOptionChange = (option) => {
    this.props.setFieldValue('userOption', option);
  }

  handleUserOptionBlur = () => {
    this.props.setFieldTouched('userOption', true);
  }

  handleInvite = (event) => {
    const {
      handleSubmit
    } = this.props;
    handleSubmit(event);
    this.setState({
      modal: false
    });
  }

  render() {
    const { data, values, errors } = this.props;
    const { userOptions } = this.state;
    return (
      <div>
        <Button color="primary" onClick={this.handleToggle}>Invite</Button>
        <Modal isOpen={this.state.modal} toggle={this.handleToggle}>
          <Form onSubmit={this.handleInvite}>
            <ModalHeader toggle={this.handleToggle}>Invite User to {data.name}</ModalHeader>
            <ModalBody>
                <FormGroup>
                  <Label>User</Label>
                  <Select
                    options={userOptions}
                    value={values.userOption}
                    onChange={this.handleUserOptionChange}
                    onBlur={this.handleUserOptionBlur}
                  />
                  { errors.userOption && <small className="text-danger">{errors.userOption}</small> }
                </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">Invite</Button>{' '}
              <Button color="secondary" onClick={this.handleToggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

const formikEnhancer = withFormik({
  mapPropsToValues: ({ userOption }) => ({
    userOption: userOption || ''
  }),
  validationSchema: Yup.object().shape({
    userOption: Yup.object().required('User is required')
  }),
  handleSubmit(values, bags) {
    const { data, users } = bags.props;
    const user = WorkspaceHelper.getUserFromOption(values.userOption, users);
    bags.props.onCreateWorkspaceUser(
      data,
      {
        user: user,
        accountType: '',
        permission: '',
      }
    );
  }
});

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  onCreateWorkspaceUser: bindActionCreators(createWorkspaceUser, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(formikEnhancer(WorkspaceUserInvite));
