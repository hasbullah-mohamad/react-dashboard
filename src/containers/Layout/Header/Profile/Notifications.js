import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DropdownItem, DropdownMenu, DropdownToggle, Badge } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppHeaderDropdown /*, AppAsideToggler, AppNavbarBrand, AppSidebarToggler*/ } from '@coreui/react';

import { fetchNotifications, readNotification } from '../../../Notification/actions';
import NotificationItem from './NotificationItem';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  componentDidMount() {
    this.props.handleFetchNotifications();
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleNotificationItemClick(item) {
    if (!item.read) {
      this.props.handleReadNotification(item);
    }
  }

  render() {
    const { notificationInfo, notifications } = this.props;
    return (
      <AppHeaderDropdown direction="down">
        <DropdownToggle nav>
          <i className="icon-bell"></i>
          { notificationInfo.unreadCount > 0 && <Badge pill color="danger">{notificationInfo.unreadCount}</Badge> }
        </DropdownToggle>
        {
          notifications.length > 0 && (
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center">
                {
                  notificationInfo.unreadCount > 0 ? (
                    <strong>You have {notificationInfo.unreadCount} new { notificationInfo.unreadCount === 1 ? 'notification' : 'notifications' }</strong>
                  ) : (
                    <strong>You don't have new notifications</strong>
                  )
                }

              </DropdownItem>
              {
                notifications.map((item, index) => (
                  <NotificationItem key={`${index}`} data={item} onClick={this.handleNotificationItemClick.bind(this, item)} />
                ))
              }
            </DropdownMenu>
          )
        }
      </AppHeaderDropdown>
    )
  }
}

Notifications.propTypes = {
  notificationInfo: PropTypes.object,
  notifications: PropTypes.array,
};

const mapStateToProps = (state) => ({
  notificationInfo: state.notification.notificationInfo,
  notifications: state.notification.notifications
});

const mapDispatchToProps = (dispatch) => ({
  handleFetchNotifications: bindActionCreators(fetchNotifications, dispatch),
  handleReadNotification: bindActionCreators(readNotification, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
