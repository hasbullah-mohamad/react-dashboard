import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
  Button,
  Form, FormGroup, FormFeedback, Label, Input
} from 'reactstrap';

import { withFormik } from 'formik';
import * as Yup from 'yup';

import { updateWorkspaceUser } from '../actions';
import WorkspaceHelper from './WorkspaceHelper';

class WorkspaceUserEdit extends Component {
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
    const { user, values, errors, handleChange } = this.props;
    return (
      <Fragment>
        <Button color="link" onClick={this.handleToggle} className="px-1">
          <i className="fa fa-lg fa-edit"></i>
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.handleToggle}>
          <Form onSubmit={this.handleInvite}>
            <ModalHeader toggle={this.handleToggle}>{user.userNested.firstName} {user.userNested.lastName}</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label>Permission</Label>
                <Input type="select" name="permission" onChange={handleChange} value={values.permission}>
                  {
                    WorkspaceHelper.getWorkspaceUserPermissionOptions().map((option, index) => (
                      <option value={option.value} key={`${index}`}>{option.label}</option>
                    ))
                  }
                </Input>
                <FormFeedback>{errors.permission}</FormFeedback>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">Update</Button>{' '}
              <Button color="secondary" onClick={this.handleToggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}

const formikEnhancer = withFormik({
  mapPropsToValues: ({ user }) => ({
    permission: user.permission || ''
  }),
  validationSchema: Yup.object().shape({
    permission: Yup.string().required('User is required')
  }),
  handleSubmit(values, bags) {
    const { workspace, user } = bags.props;
    bags.props.onUpdateWorkspaceUser(
      workspace,
      {
        ...user,
        ...values
      }
    );
  }
});

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateWorkspaceUser: bindActionCreators(updateWorkspaceUser, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(formikEnhancer(WorkspaceUserEdit));
