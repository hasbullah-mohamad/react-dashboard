import initialState from './initialState';
import * as allActions from './actionTypes'

// import moment from 'moment';

export default function workspace(state = initialState, action) {
  switch (action.type) {
    case allActions.FETCH_WORKSPACES_BEGIN:
      return {
        ...state,
        workspacesFetchError: false
      };
    case allActions.FETCH_WORKSPACES_SUCCESS:
      return {
        ...state,
        workspaces: action.payload,
        workspacesFetchError: false
      };
    case allActions.FETCH_WORKSPACES_FAILURE:
      return {
        ...state,
        workspacesFetchError: true
      };
    case allActions.CREATE_WORKSPACE_BEGIN:
      return {
        ...state,
        workspaceCreateError: false
      };
    case allActions.CREATE_WORKSPACE_SUCCESS:
      return {
        ...state,
        workspaces: [...state.workspaces, action.payload],
        workspaceCreateError: false
      };
    case allActions.CREATE_WORKSPACE_FAILURE:
      return {
        ...state,
        workspaceCreateError: true
      };
    case allActions.UPDATE_WORKSPACE_BEGIN:
      return {
        ...state,
        workspaceUpdateError: false
      };
    case allActions.UPDATE_WORKSPACE_SUCCESS: {
      const index = state.workspaces.findIndex((workspace) => {
        return workspace.id === action.payload.id
      });
      const newWorkspaces = [...state.workspaces];
      if (index >= 0) {
        newWorkspaces[index] = action.payload;
      }
      return {
        ...state,
        workspaces: newWorkspaces,
        workspaceUpdateError: false
      };
    }
    case allActions.UPDATE_WORKSPACE_FAILURE:
      return {
        ...state,
        workspaceUpdateError: true
      };
    case allActions.DELETE_WORKSPACE_BEGIN:
      return {
        ...state,
        workspaceDeleteError: false
      };
    case allActions.DELETE_WORKSPACE_SUCCESS: {
      const newWorkspaces = state.workspaces.filter((item) => {
        return item.id !== action.payload.id
      });
      return {
        ...state,
        workspaces: newWorkspaces,
        workspaceDeleteError: false
      };
    }
    case allActions.DELETE_WORKSPACE_FAILURE: {
      return {
        ...state,
        workspaceDeleteError: true
      };
    }
    case allActions.CREATE_WORKSPACE_USER_BEGIN: {
      return {
        ...state,
        workspaceUsCreateError: false
      }
    }
    case allActions.CREATE_WORKSPACE_USER_SUCCESS: {
      const { payload, workspace } = action;
      const { workspaces } = state;
      workspace.users = [...workspace.users, payload];
      const index = state.workspaces.findIndex((workspace) => {
        return workspace.id === action.payload.id
      });
      workspaces[index] = { ...workspace };
      return {
        ...state,
        workspaces: [...workspaces],
        workspaceUsCreateError: false
      }
    }
    case allActions.CREATE_WORKSPACE_USER_FAILURE: {
      const { payload, workspace } = action;
      workspace.users = [...workspace.users, payload];
      return {
        ...state,
        workspaceUsCreateError: true
      }
    }
    case allActions.UPDATE_WORKSPACE_USER_BEGIN: {
      return {
        ...state,
        workspaceUserUpdateError: false
      };
    }
    case allActions.UPDATE_WORKSPACE_USER_SUCCESS: {
      const { payload, workspace } = action;
      const { workspaces } = state;
      const userIndex = workspace.users.findIndex((user) => (
        parseInt(user.user.id) === parseInt(payload.user.id)
      ));
      workspace.users[userIndex] = payload;

      const index = state.workspaces.findIndex((workspace) => (
        workspace.id === payload.id
      ));
      workspaces[index] = { ...workspace };
      return {
        ...state,
        workspaces: [...workspaces],
        workspaceUsCreateError: false
      }
    }
    case allActions.DELETE_WORKSPACE_USER_BEGIN: {
      return {
        ...state,
        workspaceUserDeleteError: false
      };
    }
    case allActions.DELETE_WORKSPACE_USER_SUCCESS: {
      const { workspace, payload } = action;
      const newWorkspace = workspace.users.filter((user) => {
        return user.id !== payload.id
      });
      workspace.users = newWorkspace;
      return {
        ...state,
        workspaces: [...state.workspaces],
        workspaceUserDeleteError: false
      }
    }
    case allActions.DELETE_WORKSPACE_USER_FAILURE: {
      return {
        ...state,
        workspaceUserDeleteError: true
      }
    }


    // USERS

    case allActions.FETCH_USERS_BEGIN:
      return {
        ...state,
        usersFetchError: false
      };
    case allActions.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        usersFetchError: false
      };
    case allActions.FETCH_USERS_FAILURE:
      return {
        ...state,
        usersFetchError: true
      };
    case allActions.CREATE_USER_BEGIN:
      return {
        ...state,
        userCreateError: false
      };
    case allActions.CREATE_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
        userCreateError: false
      };
    case allActions.CREATE_USER_FAILURE:
      return {
        ...state,
        userCreateError: true
      };
    case allActions.UPDATE_USER_BEGIN:
      return {
        ...state,
        userUpdateError: false
      };
    case allActions.UPDATE_USER_SUCCESS: {
      const index = state.users.findIndex((user) => {
        return user.id === action.payload.id
      });
      const newUsers = [...state.users];
      if (index >= 0) {
        newUsers[index] = action.payload;
      }
      return {
        ...state,
        users: newUsers,
        userUpdateError: false
      };
    }
    case allActions.UPDATE_USER_FAILURE:
      return {
        ...state,
        userUpdateError: true
      };
    case allActions.DELETE_USER_BEGIN:
      return {
        ...state,
        userDeleteError: false
      };
    case allActions.DELETE_USER_SUCCESS: {
      const newUsers = state.users.filter((item) => {
        return item.id !== action.payload.id
      });
      return {
        ...state,
        users: newUsers,
        userDeleteError: false
      };
    }
    case allActions.DELETE_USER_FAILURE:
      return {
        ...state,
        userDeleteError: true
      };
    default:
      return state;
  }
}
