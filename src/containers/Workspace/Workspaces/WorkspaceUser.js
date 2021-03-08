import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Button
} from 'reactstrap';
import PropTypes from 'prop-types';

import { deleteWorkspaceUser } from '../actions';
import WorkspaceUserEdit from './WorkspaceUserEdit';
import WorkspaceHelper from './WorkspaceHelper';

class WorkspaceUser extends Component {
  constructor(props) {
    super(props);
    this.userPermissionOptions = WorkspaceHelper.getWorkspaceUserPermissionOptions();
  }

  handleDelete = () => {
    const { workspace, user } = this.props;
    if (window.confirm(`Do you want to delete '${user.userNested.firstName} ${user.userNested.lastName}' in '${workspace.name}'`)) {
      this.props.onDeleteWorkspaceUser(workspace, user);
    }
  }
  render() {
    const { user, workspace } = this.props;
    const permissionOption = WorkspaceHelper.getWorkspaceUserPermissionOption(this.userPermissionOptions, user.permission);
    return (
      <tr>
        <td nowrap="nowrap">{user.id}</td>
        <td nowrap="nowrap">{user.userNested.firstName} {user.userNested.lastName}</td>
        <td nowrap="nowrap">{user.isAdmin && 'Admin'}</td>
        <td nowrap="nowrap">{permissionOption && permissionOption.label}</td>
        <td nowrap="nowrap"></td>
        <td nowrap="nowrap">
          <WorkspaceUserEdit workspace={workspace} user={user} />
          <Button color="link" className="px-1" onClick={this.handleDelete}>
            <i className="fa fa-trash fa-lg"></i>
          </Button>
        </td>
      </tr>
    );
  }
}

WorkspaceUser.propTypes = {
  user: PropTypes.object,
}

WorkspaceUser.defaultProps = {
  data: {}
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  onDeleteWorkspaceUser: bindActionCreators(deleteWorkspaceUser, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceUser);
