import React, { Component } from 'react';
import {
  TabContent, TabPane, Nav, NavItem, NavLink
} from 'reactstrap';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import WorkspaceUsers from './WorkspaceUsers';
import WorkspaceUserInvite from './WorkspaceUserInvite';
import WorkspaceSettings from './WorkspaceSettings';

const TAB_USERS = 'users';
const TAB_BILLING = 'billing';
const TAB_SETTINGS = 'settings';

class Workspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
      showInfo: false,
      activeTab: TAB_USERS
    }
  }

  componentWillReceiveProps(props) {
    if (props.data !== this.props.data)
    this.setState({
      isEditMode: false
    });
  }

  handleToggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const { data, users } = this.props;
    return (
      <div className="mb-5">
        <div className="d-flex flex-wrap justify-content-between">
          <h4>{data.name}</h4>
          <div className="">
            <WorkspaceUserInvite data={data} users={users} />
          </div>
        </div>

        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === TAB_USERS })}
              onClick={this.handleToggleTab.bind(this, TAB_USERS)}
            >
              Users
            </NavLink>
          </NavItem>
          {/*
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === TAB_BILLING })}
              onClick={this.handleToggleTab.bind(this, TAB_BILLING)}
            >
              Billing
            </NavLink>
          </NavItem>
          */}
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === TAB_SETTINGS })}
              onClick={this.handleToggleTab.bind(this, TAB_SETTINGS)}
            >
              Settings
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId={TAB_USERS}>
            <WorkspaceUsers data={data} users={users} />
          </TabPane>
          <TabPane tabId={TAB_BILLING}>
            Billings
          </TabPane>
          <TabPane tabId={TAB_SETTINGS}>
            <WorkspaceSettings data={data} />
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

Workspace.propTypes = {
  data: PropTypes.object
}

export default Workspace;
