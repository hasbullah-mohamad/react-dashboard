import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  DropdownMenu, DropdownToggle, DropdownItem
} from 'reactstrap';
import { Auth } from 'react-django';
import { AppHeaderDropdown } from '@coreui/react';
import { withRouter } from 'react-router-dom';

import { Images } from '../../../../theme';


class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    }
  }

  handleGotoProfile = (event) => {
    this.props.history.push('/profile');
  }

  render() {
    const { user } = this.props;
    return (
      <AppHeaderDropdown direction="down">
      <DropdownToggle nav>
        <img src={user.avatar || Images.avatar} className="img-avatar" alt={user.username}/>
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header tag="div" className="text-center"><strong>{ user.username }</strong></DropdownItem>
        <DropdownItem onClick={this.handleGotoProfile}><i className="fa fa-edit"></i> Edit Profile</DropdownItem>
        <DropdownItem onClick={Auth.logout}><i className="fa fa-lock"></i> Logout</DropdownItem>
      </DropdownMenu>
    </AppHeaderDropdown>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.profile.user,
});

const mapDispatchToProps = (dispatch) => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserInfo));
