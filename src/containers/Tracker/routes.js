import Analytics from './Analytics'
import Calendar from './Calendar'
import Events from './Events'
import Projects from './Projects'
import Clients from './Clients'

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/analytics', exact: true, name: 'Analytics', component: Analytics },
  { path: '/calendar', exact: true,  name: 'Calendar', component: Calendar },
  { path: '/events', exact: true,  name: 'Events', component: Events },
  { path: '/projects', exact: true,  name: 'Projects', component: Projects },
  { path: '/clients', exact: true,  name: 'Clients', component: Clients },
];

export default routes;
