// import { Crud } from 'react-django';
import * as allActions from './actionTypes'


// For now fake requst into Endpoint
export function fetchNotifications() {
  return dispatch => {
    dispatch({
      type: allActions.FETCH_NOTIFICATIONS_BEGIN
    });
    setTimeout(() => {
      dispatch({
        type: allActions.FETCH_NOTIFICATIONS_SUCCESS,
        payload: {
          notificationInfo: {
            unreadCount: 3,
            totalCount: 5,
            current: 1,
            next: 1
          },
          notifications: [
            {
              id: 5,
              icon: 'icon-user-follow',
              type: 'text-success',
              title: 'New user registered',
              description: '',
              created_at: '2018-01-01T00:00:00-0000',
              read: false
            },
            {
              id: 4,
              title: 'User deleted',
              icon: 'icon-user-unfollow',
              type: 'text-danger',
              description: '',
              created_at: '2018-01-01T00:00:00-0000',
              read: false
            },
            {
              id: 3,
              title: 'Sales report is ready',
              icon: 'icon-chart',
              type: 'text-info',
              description: '',
              created_at: '2018-01-01T00:00:00-0000',
              read: false
            },
            {
              id: 2,
              title: ' New client',
              icon: 'icon-basket-loaded',
              type: 'text-primary',
              description: '',
              created_at: '2018-01-01T00:00:00-0000',
              read: true
            },
            {
              id: 1,
              title: 'Server overloaded',
              icon: 'icon-speedometer',
              type: 'text-warning',
              description: '',
              created_at: '2018-01-01T00:00:00-0000',
              read: true
            },
          ]
        }
      });
    }, 500);
  };
}

export function createNotification(notification) {
  return dispatch => {
    dispatch({
      type: allActions.CREATE_NOTIFICATION_BEGIN,
    });
    setTimeout(() => {
      dispatch({
        type: allActions.CREATE_NOTIFICATION_SUCCESS,
        payload: notification
      });
    }, 500);
  }
}

export function readNotification(notification) {
  return dispatch => {
    dispatch({
      type: allActions.READ_NOTIFICATION_BEGIN,
    });
    setTimeout(() => {
      dispatch({
        type: allActions.READ_NOTIFICATION_SUCCESS,
        payload: notification
      });
    }, 500);
  }
}