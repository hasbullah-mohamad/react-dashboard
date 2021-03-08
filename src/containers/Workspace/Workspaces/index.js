import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  fetchUsers,
  fetchWorkspaces,
  createWorkspace
} from '../actions';
// import Adder from './Adder';
import Workspace from './Workspace';

class Workspaces extends React.Component {
  componentDidMount() {
    this.props.onFetchUsers();
    this.props.onFetchWorkspaces();
  }

  handleCreate(workspace) {
    this.props.onCreateWorkspace(workspace);
  }

  handleUpdate(workspace) {
    this.props.onUpdateWorkspace(workspace);
  }

  handleDelete(workspace) {
    if (window.confirm(`Are you sure to delete workspace - ${workspace.name}?`)) {
      this.props.onDeleteWorkspace(workspace);
    }
  }

  handleCreateItem(workspace, workspaceItem) {
    this.props.onCreateWorkspaceItem(workspace, workspaceItem);
  }

  handleUpdateItem(workspace, workspaceItem) {
    this.props.onUpdateWorkspaceItem(workspace, workspaceItem);
  }

  handleDeleteItem(workspace, workspaceItem) {
    if (window.confirm(`Are you sure to delete workspace - ${workspaceItem.id}?`)) {
      this.props.onDeleteWorkspaceItem(workspace, workspaceItem);
    }
  }

  render() {
    const { workspace, users } = this.props;
    return (
      <Fragment>
        {/*
          <Adder
            onAdd={this.handleCreate.bind(this)}
          />
        */}
          <Workspace data={workspace} users={users} />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  workspace: state.workspace.workspaces.find(workspace => (
    workspace.id === state.workspace.current_workspace
  )) || {},
  users: state.workspace.users || []
});

const mapDispatchToProps = (dispatch) => ({
  onFetchUsers: bindActionCreators(fetchUsers, dispatch),
  onFetchWorkspaces: bindActionCreators(fetchWorkspaces, dispatch),
  onCreateWorkspace: bindActionCreators(createWorkspace, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Workspaces);

