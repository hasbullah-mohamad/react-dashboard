import Tracker from './containers/Tracker/nav';
import Workspace from './containers/Workspace/nav';

export default function nav(groups) {
  let navigation = {
    items: [
    ],
  };

  navigation.items.push(...Tracker)
  navigation.items.push(...Workspace)

  return navigation
}
