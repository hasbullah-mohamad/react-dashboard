import React from 'react';

import { TabPane, ListGroup, ListGroupItem } from 'reactstrap';


const notifications = () => {
  return (
    <TabPane tabId="1">
      <ListGroup className="list-group-accent">
        <ListGroupItem className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">Today</ListGroupItem>
        <ListGroupItem action tag="a" href="" className="list-group-item-accent-warning list-group-item-divider">
          <div className="avatar float-right">
            <img className="img-avatar" src="assets/img/avatars/7.jpg" alt="admin@bootstrapmaster.com"></img>
          </div>
          <div>Meeting with <strong>Lucas</strong> </div>
          <small className="text-muted mr-3">
            <i className="icon-calendar"></i>&nbsp; 1 - 3pm
          </small>
          <small className="text-muted">
            <i className="icon-location-pin"></i> Palo Alto, CA
          </small>
        </ListGroupItem>
        <ListGroupItem action tag="a" href="" className="list-group-item-accent-info list-group-item-divider">
          <div className="avatar float-right">
            <img className="img-avatar" src="assets/img/avatars/4.jpg" alt="admin@bootstrapmaster.com"></img>
          </div>
          <div>Skype with <strong>Megan</strong></div>
          <small className="text-muted mr-3">
            <i className="icon-calendar"></i>&nbsp; 4 - 5pm
          </small>
          <small className="text-muted">
            <i className="icon-social-skype"></i> On-line
          </small>
        </ListGroupItem>
        <ListGroupItem className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">Tomorrow</ListGroupItem>
        <ListGroupItem action tag="a" href="" className="list-group-item-accent-danger list-group-item-divider">
          <div>New UI Project - <strong>deadline</strong></div>
          <small className="text-muted mr-3"><i className="icon-calendar"></i>&nbsp; 10 - 11pm</small>
          <small className="text-muted"><i className="icon-home"></i>&nbsp; creativeLabs HQ</small>
          <div className="avatars-stack mt-2">
            <div className="avatar avatar-xs">
              <img src={'assets/img/avatars/2.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </div>
            <div className="avatar avatar-xs">
              <img src={'assets/img/avatars/3.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </div>
            <div className="avatar avatar-xs">
              <img src={'assets/img/avatars/4.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </div>
            <div className="avatar avatar-xs">
              <img src={'assets/img/avatars/5.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </div>
            <div className="avatar avatar-xs">
              <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </div>
          </div>
        </ListGroupItem>
        <ListGroupItem action tag="a" href="" className="list-group-item-accent-success list-group-item-divider">
          <div><strong>#10 Startups.Garden</strong> Meetup</div>
          <small className="text-muted mr-3"><i className="icon-calendar"></i>&nbsp; 1 - 3pm</small>
          <small className="text-muted"><i className="icon-location-pin"></i>&nbsp; Palo Alto, CA</small>
        </ListGroupItem>
        <ListGroupItem action tag="a" href="" className="list-group-item-accent-primary list-group-item-divider">
          <div><strong>Team meeting</strong></div>
          <small className="text-muted mr-3"><i className="icon-calendar"></i>&nbsp; 4 - 6pm</small>
          <small className="text-muted"><i className="icon-home"></i>&nbsp; creativeLabs HQ</small>
          <div className="avatars-stack mt-2">
            <div className="avatar avatar-xs">
              <img src={'assets/img/avatars/2.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </div>
            <div className="avatar avatar-xs">
              <img src={'assets/img/avatars/3.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </div>
            <div className="avatar avatar-xs">
              <img src={'assets/img/avatars/4.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </div>
            <div className="avatar avatar-xs">
              <img src={'assets/img/avatars/5.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </div>
            <div className="avatar avatar-xs">
              <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </div>
            <div className="avatar avatar-xs">
              <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </div>
            <div className="avatar avatar-xs">
              <img src={'assets/img/avatars/8.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </div>
          </div>
        </ListGroupItem>
      </ListGroup>
    </TabPane>
  )
}

export default notifications
