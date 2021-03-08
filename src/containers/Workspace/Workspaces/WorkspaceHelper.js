const WorkspaceHelper = {
  getUserOptions(users) {
    let ret = [];
    if (users && users.length > 0) {
      ret = users.map((user) => ({
          value: user.id,
          label: `${user.firstName} ${user.lastName}`
      }));
    }
    return ret;
  },
  getUserFromOption(userOption, users) {
    if (userOption && users && users.length > 0) {
      for(let i=0, ni=users.length; i<ni; i++) {
        const user = users[i];
        if(parseInt(userOption.value) === parseInt(user.id)) {
          return user;
        }
      }
    }
    return null;
  },
  getWorkspaceUserPermissionOptions() {
    return [
      {
        value: 'owner',
        label: 'Owner'
      },
      {
        value: 'admin',
        label: 'Administrator'
      },
      {
        value: 'write',
        label: 'Write'
      },

      {
        value: 'read',
        label: 'Read'
      },
    ]
  },
  getWorkspaceUserPermissionOption(permissionOptions, permission) {
    if (permissionOptions && permissionOptions && permissionOptions.length > 0) {
      for(let i=0, ni=permissionOptions.length; i<ni; i++) {
        const permissionOption = permissionOptions[i];
        if(permissionOption.value === permission) {
          console.log(permissionOption, 'administrator:manager');
          return permissionOption;
        }
      }
    }
    return null;
  }
}

export default WorkspaceHelper;
