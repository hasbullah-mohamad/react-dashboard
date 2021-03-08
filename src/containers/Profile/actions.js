import { Crud } from 'react-django';
import * as allActions from './actionTypes'

export function fetchUser() {

  return dispatch => {
    dispatch({
      type: allActions.FETCH_USER_BEGIN
    });
    return Crud.fetchApi('api/user/')
      .then(([response, json]) => {
        if (response.ok) {
          dispatch({
            type: allActions.FETCH_USER_SUCCESS,
            payload: json.results[0]
          });
          return json.results[0];
        } else {
          alert(JSON.stringify(json))
          dispatch({
            type: allActions.FETCH_USER_FAILURE
          })
        }
      })
      .catch(error => {
        dispatch({
          type: allActions.FETCH_USER_FAILURE,
          payload: error
        })
        console.error(error)
      });
  };
}

export function updateUser(payload) {
  return dispatch => {
    dispatch({
      type: allActions.UPDATE_USER_BEGIN
    });
    return Crud.updateApi(`api/user/${payload.id}/`, payload)
      .then(([response, json]) => {
        if (response.ok) {
          dispatch({
            type: allActions.UPDATE_USER_SUCCESS,
            payload: json
          });
          return json;
        } else {
          alert(JSON.stringify(json))
          dispatch({
            type: allActions.UPDATE_USER_FAILURE
          })
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
