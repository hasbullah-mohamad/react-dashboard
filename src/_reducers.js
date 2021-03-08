import { combineReducers } from 'redux'

import profile from './containers/Profile/reducers';
import tracker from './containers/Tracker/reducers';
import notification from './containers/Notification/reducers';
import workspace from './containers/Workspace/reducers';

const rootReducer = combineReducers({
  profile,
  tracker,
  notification,
  workspace,
})

export default rootReducer
