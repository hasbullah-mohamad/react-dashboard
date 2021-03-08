import initialState from './initialState';
import * as allActions from './actionTypes'

import moment from 'moment';

export default function tracker(state = initialState, action) {
  switch (action.type) {
    case allActions.FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload.map(event => ({
          ...event,
          minutes: moment.duration(moment(event.end).diff(moment(event.start))).asMinutes(),
        }))
      };
    case allActions.UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        events: state.events.map(
          event => (event.id === action.payload.id) ?
          {
            ...action.payload,
            minutes: moment.duration(moment(action.payload.end).diff(moment(action.payload.start))).asMinutes(),
          } : event
        )
      };
    case allActions.CREATE_EVENT_SUCCESS:
      return {
        ...state,
        events: [
          ...state.events,
          {
            ...action.payload,
            minutes: moment.duration(moment(action.payload.end).diff(moment(action.payload.start))).asMinutes(),
          }
        ]
      };
    case allActions.DELETE_EVENT_SUCCESS:
      return {
        ...state,
        events: state.events.filter(event => (event.id !== action.payload.id))
      };
    case allActions.FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload
      };
    case allActions.UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.map(
          project => (project.id === action.payload.id) ? action.payload : project
        )
      };
    case allActions.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };
    case allActions.DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.filter(project => (project.id !== action.payload.id))
      };
    case allActions.FETCH_CLIENTS_SUCCESS:
      return {
        ...state,
        clients: action.payload
      };
    case allActions.UPDATE_CLIENT_SUCCESS:
      return {
        ...state,
        clients: state.clients.map(
          client => (client.id === action.payload.id) ? action.payload : client
        )
      };
    case allActions.CREATE_CLIENT_SUCCESS:
      return {
        ...state,
        clients: [...state.clients, action.payload]
      };
    case allActions.DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        clients: state.clients.filter(client => (client.id !== action.payload.id))
      };

    default:
      return state;
  }
}
