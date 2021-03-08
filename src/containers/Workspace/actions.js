import * as allActions from './actionTypes'
import { Crud } from 'react-django'
// import moment from "moment";

export function fetchWorkspaces() {
  return (dispatch, getState) => {
    dispatch({
      type: allActions.FETCH_WORKSPACES_BEGIN
    });
    return Crud.fetchApi(`api/organizations/`)
      .then(([response, json]) => {
        if (response.ok) {
          dispatch({
            type: allActions.FETCH_WORKSPACES_SUCCESS,
            payload: json.results
          });
          return json.results;
        } else {
          alert(JSON.stringify(json))
        }
      })
      .catch(error => {
        dispatch({
          type: allActions.FETCH_WORKSPACES_FAILURE,
          payload: error
        })
        console.error(error)
      });
  };
}

export function createWorkspace(payload) {
  return dispatch => {
    dispatch({
      type: allActions.CREATE_WORKSPACE_BEGIN,
      payload
    });
    // setTimeout(() => {
    //   absoluteKey++;
    //   console.log('CREATE_WORKSPACE', payload);
    //   dispatch({
    //     type: allActions.CREATE_WORKSPACE_SUCCESS,
    //     payload: {
    //       ...payload,
    //       id: absoluteKey
    //     }
    //   });
    // }, 500);
  }
}

export function updateWorkspace(payload) {
  return dispatch => {
    dispatch({
      type: allActions.UPDATE_WORKSPACE_BEGIN,
      payload
    });
    return Crud.updateApi(`api/organizations/${payload.id}/`, payload)
      .then(([response, json]) => {
        if (response.ok) {
          return json;
        } else {
          alert(JSON.stringify(json))
        }
      })
      .catch(error => {
        dispatch({
          type: allActions.UPDATE_WORKSPACE_FAILURE,
          payload: error
        })
        console.error(error)
      });
  }
}

export function deleteWorkspace(payload) {
  return dispatch => {
    dispatch({
      type: allActions.DELETE_WORKSPACE_BEGIN,
      payload: { ...payload, isActive: false }
    });
    return Crud.updateApi(`api/organizations/${payload.id}/`, { ...payload, isActive: false })
      .then(([response, json]) => {
        if (response.ok) {
          return json;
        } else {
          alert(JSON.stringify(json))
        }
      })
      .catch(error => {
        dispatch({
          type: allActions.UPDATE_WORKSPACE_FAILURE,
          payload: error
        })
        console.error(error)
      });
  };
}

export function createWorkspaceUser(workspace, payload) {
  return dispatch => {
    dispatch({
      type: allActions.CREATE_WORKSPACE_USER_BEGIN,
      workspace,
      payload
    });
    // setTimeout(() => {
    //   absoluteKey++;
    //   dispatch({
    //     type: allActions.CREATE_WORKSPACE_USER_SUCCESS,
    //     workspace,
    //     payload: {
    //       id: absoluteKey,
    //       ...payload
    //     }
    //   });
    // }, 500);
  }
}

export function updateWorkspaceUser(workspace, payload) {
  return dispatch => {
    dispatch({
      type: allActions.UPDATE_WORKSPACE_USER_BEGIN,
      workspace,
      payload
    });
    setTimeout(() => {
      dispatch({
        type: allActions.UPDATE_WORKSPACE_USER_SUCCESS,
        workspace,
        payload
      });
    }, 500);
  }
}

export function deleteWorkspaceUser(workspace, payload) {
  return dispatch => {
    dispatch({
      type: allActions.DELETE_WORKSPACE_USER_BEGIN,
      workspace,
      payload
    });
    setTimeout(() => {
      dispatch({
        type: allActions.DELETE_WORKSPACE_USER_SUCCESS,
        workspace,
        payload
      });
    }, 500);
  }
}



// Users
export function fetchUsers() {
  return (dispatch, getState) => {
    dispatch({
      type: allActions.FETCH_USERS_BEGIN
    });
    const { current_workspace } = getState().workspace
    return Crud.fetchApi(`api/organization-users/?organization_id=${current_workspace}`)
      .then(([response, json]) => {
        if (response.ok) {
          dispatch({
            type: allActions.FETCH_USERS_SUCCESS,
            payload: json.results
          });
          return json;
        } else {
          alert(JSON.stringify(json))
        }
      })
      .catch(error => {
        dispatch({
          type: allActions.FETCH_USERS_FAILURE,
          payload: error
        })
        console.error(error)
      });
  };
}

export function updateUser(user) {
  return (dispatch, getState) => {
    dispatch({
      type: allActions.UPDATE_USER_SUCCESS,
      payload: user
    });
    return Crud.updateApi(`api/userProfile/${user.id}/`, user)
      .then(([response, json]) => {
        if (response.ok) {
          return json;
        } else {
          alert(JSON.stringify(json))
        }
      })
      .catch(error => {
        dispatch({
          type: allActions.UPDATE_USER_FAILURE,
          payload: error
        })
        console.error(error)
      });
  };
}

export function createUser(user) {
  return (dispatch, getState) => {
    dispatch({
      type: allActions.CREATE_USER_BEGIN
    });
    return Crud.createApi(`api/userProfile/`, user)
      .then(([response, json]) => {
        if (response.ok) {
          dispatch({
            type: allActions.CREATE_USER_SUCCESS,
            payload: json
          });
          return json;
        } else {
          alert(JSON.stringify(json))
        }
      })
      .catch(error => {
        dispatch({
          type: allActions.CREATE_USER_FAILURE,
          payload: error
        })
        console.error(error)
      });
  };
}

export function deleteUser(user) {
  return (dispatch, getState) => {
    dispatch({
      type: allActions.DELETE_USER_SUCCESS,
      payload: user
    });
    return Crud.destroyApi(`api/userProfile/${user.id}/`)
      .then(([response, json]) => {
        if (response.ok) {
          return json;
        } else {
          alert(JSON.stringify(json))
        }
      })
      .catch(error => {
        dispatch({
          type: allActions.DELETE_USER_FAILURE,
          payload: error
        })
        console.error(error)
      });
  };
}
// export function createUser(payload) {
//   return dispatch => {
//     dispatch({
//       type: allActions.CREATE_USER_BEGIN,
//       payload
//     });
//     setTimeout(() => {
//       absoluteKey++;
//       dispatch({
//         type: allActions.CREATE_USER_SUCCESS,
//         payload: {
//           ...payload,
//           id: absoluteKey
//         }
//       });
//     }, 500);
//   }
// }

// export function updateUser(payload) {
//   return dispatch => {
//     dispatch({
//       type: allActions.UPDATE_USER_BEGIN,
//       payload
//     });
//     setTimeout(() => {
//       dispatch({
//         type: allActions.UPDATE_USER_SUCCESS,
//         payload
//       });
//     }, 500);
//   }
// }

// export function deleteUser(payload) {
//   return dispatch => {
//     dispatch({
//       type: allActions.DELETE_USER_BEGIN,
//       payload
//     });
//     setTimeout(() => {
//       dispatch({
//         type: allActions.DELETE_USER_SUCCESS,
//         payload
//       });
//     }, 500);
//   };
// }
