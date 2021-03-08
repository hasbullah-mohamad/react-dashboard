import React, { Component } from 'react';
import {
  Table
} from 'reactstrap';
import PropTypes from 'prop-types';

import WorkspaceUser from './WorkspaceUser';

class WorkspaceUsers extends Component {
  get userOptions() {
    const { users } = this.props;
    let ret = [];
    if (users && users.length > 0) {
      ret = users.map((user) => ({
          value: user.id,
          label: `${user.firstName} ${user.lastName}`
      }));
    }
    return ret;
  }

  render() {
    const {
      data,
      users = []
    } = this.props;
    return (
      <Table responsive>
        <thead>
          <tr>
            <th style={{ width: '20px' }} nowrap="nowrap">#</th>
            <th style={{ width: '30%' }} nowrap="nowrap">Name</th>
            <th style={{ width: '20%' }} nowrap="nowrap">Account Type</th>
            <th style={{ width: '20%' }} nowrap="nowrap">Permission</th>
            <th style={{ width: '*' }} nowrap="nowrap">Online</th>
            <th style={{ width: '80px' }} nowrap="nowrap"></th>
          </tr>
        </thead>
        <tbody>
          {
            users.length > 0 ? (
              users.map((user, index) => (
                <WorkspaceUser key={`${index}`} user={user} workspace={data} users={users} />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">There are no users.</td>
              </tr>
            )
          }
        </tbody>
      </Table>
    );
  }
}

WorkspaceUsers.propTypes = {
  isAdding: PropTypes.bool,
  data: PropTypes.object,
  onAdd: PropTypes.func
}

WorkspaceUsers.defaultProps = {
  isAdding: false,
  data: {},
  onDelete: () => {}
}

export default WorkspaceUsers;
