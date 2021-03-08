import Layout from './containers/Layout';
import Home from './containers/Home'

import Tracker from './containers/Tracker/routes';
import Profile from './containers/Profile/routes';
import Workspace from './containers/Workspace/routes';


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: Layout },
  { path: '/home', name: '', component: Home },

  ...Tracker,
  ...Profile,
  ...Workspace,
];

export default routes;
