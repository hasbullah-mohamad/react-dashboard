import React from 'react';
import { DropdownItem, Badge } from 'reactstrap';
import PropTypes from 'prop-types';

const NotificationItem = (props) => {
  const { data, onClick } = props;
  return (
    <DropdownItem onClick={onClick}>
      <i className={data.icon + ' ' + data.type}></i>
      {data.title}
      {
        !data.read ? (<Badge color="danger pull-right">New</Badge>) : null
      }
    </DropdownItem>
  )
}

NotificationItem.propTypes = {
  onClick: PropTypes.func,
  data: PropTypes.object
}

NotificationItem.defaultProps = {
  onClick: () => {}
}
export default NotificationItem;