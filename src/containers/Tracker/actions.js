import * as allActions from './actionTypes'
import { Crud } from 'react-django'
import moment from "moment";

export function fetchEvents() {
  return (dispatch, getState) => {
    const { current_workspace } = getState().workspace
    return Crud.fetchApi(`api/events/?organization_id=${current_workspace}`)
      .then(([response, json]) => {
        if (response.ok) {
          dispatch({
            type: allActions.FETCH_EVENTS_SUCCESS,
            payload: json.results.map(event => ({
              ...event,
              start: moment(event.start).format('YYYY-MM-DDTHH:mm'),
              end: moment(event.end).format('YYYY-MM-DDTHH:mm'),
            }))
          });
          return json.results;
        } else {
          alert(JSON.stringify(json))
        }
      })
      .catch(error => {
        dispatch({
          type: allActions.FETCH_EVENTS_FAILURE,
          payload: error
        })
        console.error(error)
      });
  };
}

export function updateEvent(event) {
  return (dispatch, getState) => {
    dispatch({
      type: allActions.UPDATE_EVENT_SUCCESS,
      payload: event
    });
    return Crud.updateApi(`api/events/${event.id}/`, event)
      .then(([response, json]) => {
        if (response.ok) {
          return json;
        } else {
          alert(JSON.stringify(json))
        }
      })
      .catch(error => {
        dispatch({
          type: allActions.UPDATE_EVENT_FAILURE,
          payload: error
        })
        console.error(error)
      });
  };
}

export function createEvent(event) {
  return (dispatch, getState) => {
    dispatch({
      type: allActions.CREATE_EVENT_BEGIN
    });
    return Crud.createApi(`api/events/`, event)
      .then(([response, json]) => {
        if (response.ok) {
          dispatch({
            type: allActions.CREATE_EVENT_SUCCESS,
            payload: {
              ...json,
              start: moment(json.start).format('YYYY-MM-DDTHH:mm'),
              end: moment(json.end).format('YYYY-MM-DDTHH:mm'),
            }
          });
          return json;
        } else {
          alert(JSON.stringify(json))
        }
      })
      .catch(error => {
        dispatch({
          type: allActions.CREATE_EVENT_FAILURE,
          payload: error
        })
        console.error(error)
      });
  };
}

export function deleteEvent(event) {
  return (dispatch, getState) => {
    dispatch({
      type: allActions.DELETE_EVENT_SUCCESS,
      payload: event
    });
    return Crud.destroyApi(`api/events/${event.id}/`)
      .then(([response, json]) => {
        if (response.ok) {
          return json;
        } else {
          alert(JSON.stringify(json))
        }
      })
      .catch(error => {
        dispatch({
          type: allActions.DELETE_EVENT_FAILURE,
          payload: error
        })
        console.error(error)
      });
  };
}

export function fetchProjects() {
  return (dispatch, getState) => {
    dispatch({
      type: allActions.FETCH_PROJECTS_BEGIN
    });
    const { current_workspace } = getState().workspace
    return Crud.fetchApi(`api/projects/?organization_id=${current_workspace}`)
      .then(([response, json]) => {
        if (response.ok) {
          dispatch({
            type: allActions.FETCH_PROJECTS_SUCCESS,
            payload: json.results
          });
          return json.results;
        } else {
          alert(JSON.stringify(json))
        }
      })
      .catch(error => {
        dispatch({
          type: allActions.FETCH_PROJECTS_FAILURE,
          payload: error
        })
        console.error(error)
      });
  };
}

export function updateProject(project) {
  return (dispatch, getState) => {
    dispatch({
      type: allActions.UPDATE_PROJECT_SUCCESS,
      payload: project
    });
    return Crud.updateApi(`api/projects/${project.id}/`, project)
      .then(([response, json]) => {
        if (response.ok) {
          return json;
        } else {
          alert(JSON.stringify(json))
        }
      })
      .catch(error => {
        dispatch({
          type: allActions.UPDATE_PROJECT_FAILURE,
          payload: error
        })
        console.error(error)
      });
  };
}

export function createProject(project) {
  return (dispatch, getState) => {
    dispatch({
      type: allActions.CREATE_PROJECT_BEGIN
    });
    const { current_workspace } = getState().workspace
    return Crud.createApi(`api/projects/`, { ...project, organization:current_workspace } )
      .then(([response, json]) => {
        if (response.ok) {
          dispatch({
            type: allActions.CREATE_PROJECT_SUCCESS,
            payload: json
          });
          return json;
        } else {
          alert(JSON.stringify(json))
        }
      })
      .catch(error => {
        dispatch({
          type: allActions.CREATE_PROJECT_FAILURE,
          payload: error
        })
        console.error(error)
      });
  };
}

export function deleteProject(project) {
  return (dispatch, getState) => {
    dispatch({
      type: allActions.DELETE_PROJECT_SUCCESS,
      payload: project
    });
    return Crud.destroyApi(`api/projects/${project.id}/`)
      .then(([response, json]) => {
        if (response.ok) {
          return json;
        } else {
          alert(JSON.stringify(json))
        }
      })
      .catch(error => {
        dispatch({
          type: allActions.DELETE_PROJECT_FAILURE,
          payload: error
        })
        console.error(error)
      });
  };
}


export function fetchClients() {
  return (dispatch, getState) => {
    dispatch({
      type: allActions.FETCH_CLIENTS_BEGIN
    });
    const { current_workspace } = getState().workspace
    return Crud.fetchApi(`api/clients/?organization_id=${current_workspace}`)
      .then(([response, json]) => {
        if (response.ok) {
          dispatch({
            type: allActions.FETCH_CLIENTS_SUCCESS,
            payload: json.results
          });
          return json.results;
        } else {
          alert(JSON.stringify(json))
        }
      })
      .catch(error => {
        dispatch({
          type: allActions.FETCH_CLIENTS_FAILURE,
          payload: error
        })
        console.error(error)
      });
  };
}

export function updateClient(client) {
  return (dispatch, getState) => {
    dispatch({
      type: allActions.UPDATE_CLIENT_SUCCESS,
      payload: client
    });
    return Crud.updateApi(`api/clients/${client.id}/`, client)
      .then(([response, json]) => {
        if (response.ok) {
          return json;
        } else {
          alert(JSON.stringify(json))
        }
      })
      .catch(error => {
        dispatch({
          type: allActions.UPDATE_CLIENT_FAILURE,
          payload: error
        })
        console.error(error)
      });
  };
}

export function createClient(client) {
  return (dispatch, getState) => {
    dispatch({
      type: allActions.CREATE_CLIENT_BEGIN
    });
    return Crud.createApi(`api/clients/`, client)
      .then(([response, json]) => {
        if (response.ok) {
          dispatch({
            type: allActions.CREATE_CLIENT_SUCCESS,
            payload: json
          });
          return json;
        } else {
          alert(JSON.stringify(json))
        }
      })
      .catch(error => {
        dispatch({
          type: allActions.CREATE_CLIENT_FAILURE,
          payload: error
        })
        console.error(error)
      });
  };
}

export function deleteClient(client) {
  return (dispatch, getState) => {
    dispatch({
      type: allActions.DELETE_CLIENT_SUCCESS,
      payload: client
    });
    return Crud.destroyApi(`api/clients/${client.id}/`)
      .then(([response, json]) => {
        if (response.ok) {
          return json;
        } else {
          alert(JSON.stringify(json))
        }
      })
      .catch(error => {
        dispatch({
          type: allActions.DELETE_CLIENT_FAILURE,
          payload: error
        })
        console.error(error)
      });
  };
}
