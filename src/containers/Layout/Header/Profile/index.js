import React, { Component } from 'react';
import { Nav /*, Badge, NavItem, NavLink */} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import Notifications from './Notifications';
import UserInfo from './UserInfo';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {

};

class HeaderProfile extends Component {

  render() {
    const { user } = this.props;
    // eslint-disable-next-line
    return (
      <Nav className="ml-auto" navbar>
        {/*
        <NavItem className="d-md-down-none">
          <NavLink href=""><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
        </NavItem>
        <NavItem className="d-md-down-none">
          <NavLink href=""><i className="icon-list"></i></NavLink>
        </NavItem>
        <NavItem className="d-md-down-none">
          <NavLink href=""><i className="icon-location-pin"></i></NavLink>
        </NavItem>
        */}
        <Notifications />
        <UserInfo data={user} />
      </Nav>
    );
  }
}

HeaderProfile.propTypes = propTypes;
HeaderProfile.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    user: state.profile.user
  }
}

export default connect(
  mapStateToProps
)(HeaderProfile);
