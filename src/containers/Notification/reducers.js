import initialState from './initialState';
import * as allActions from './actionTypes'

export default function notification(state = initialState, action) {
  switch (action.type) {
    case allActions.FETCH_NOTIFICATIONS_BEGIN:
      return {
        ...state,
        notificationsFetchError: false
      };
    case allActions.FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notificationInfo: action.payload.notificationInfo,
        notifications: action.payload.notifications,
        notificationsFetchError: false
      };
    case allActions.FETCH_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        notificationsFetchError: true
      };
    case allActions.FETCH_NEXT_NOTIFICATIONS_BEGIN: {
      return {
        ...state,
        nextNotificationsFetchError: false,
      }
    }
    case allActions.FETCH_NEXT_NOTIFICATIONS_SUCCESS: {
      const { notifcationInfo: prevNotificationInfo } = state;
      const { notificationInfo, notifications } = action.payload;
      if (prevNotificationInfo.next === notificationInfo.current) {
        return {
          ...state,
          notificationInfo,
          notifications: [...state.notifications, ...notifications],
          nextNotificationsFetchError: false
        }
      }
      return state;
    }
    case allActions.FETCH_NEXT_NOTIFICATIONS_FAILURE: {
      return {
        ...state,
        nextNotificationsFetchError: true
      }
    }
    case allActions.CREATE_NOTIFICATION_BEGIN: 
      return {
        ...state,
        notificationCreateError: false
      };
    case allActions.CREATE_NOTIFICATION_SUCCESS: {
      const { notificationInfo } = state;
      const newNotifcationInfo = {
        ...notificationInfo,
        totalCount: notificationInfo.totalCount + 1,
        unreadCount: notificationInfo.unreadCount + 1,
      };
      return {
        ...state,
        notificationInfo: newNotifcationInfo,
        notifcations: [action.payload, ...state.notifcations],
        notificationCreateError: false
      }
    }
    case allActions.CREATE_NOTIFICATION_FAILURE: {
      return {
        ...state,
        notificationCreateError: true
      }
    }
    case allActions.READ_NOTIFICATION_BEGIN: {
      return {
        ...state,
        notificationReadError: false
      }
    }
    case allActions.READ_NOTIFICATION_SUCCESS: {
      const { notificationInfo, notifications } = state;
      const { payload } = action;
      const newNotifcationInfo = {
        ...notificationInfo,
        unreadCount: (notificationInfo.unreadCount - 1) < 0 ? 0 : notificationInfo.unreadCount - 1
      };
      for(let i=0, ni=notifications.length; i<ni; i++) {
        const notification = notifications[i];
        if (notification.id === payload.id) {
          notifications[i].read = true;
        }
      }
      return {
        ...state,
        notificationInfo: newNotifcationInfo,
        notifications: [...notifications],
        notificationReadError: false
      }
    }
    case allActions.READ_NOTIFICATION_FAILURE: {
      return {
        ...state,
        notificationReadError: true
      }
    }
    default:
      return state;
  }
}
