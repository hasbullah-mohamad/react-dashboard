import initialState from './initialState';
import * as allActions from './actionTypes'

export default function profile(state = initialState, action) {
  switch (action.type) {
    case allActions.FETCH_USER_BEGIN:
      return {
        ...state,
        userFetchError: false
      };
    case allActions.FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        userFetchError: false
      };
    case allActions.FETCH_USER_FAILURE:
      return {
        ...state,
        userFetchError: true
      };
    case allActions.UPDATE_USER_BEGIN:
      return {
        ...state,
        userUpdateError: false
      };
    case allActions.UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        userUpdateError: false
      };
    case allActions.UPDATE_USER_FAILURE:
      return {
        ...state,
        userUpdateError: true
      };
    default:
      return state;
  }
}
