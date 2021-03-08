import Auth from "../utils"
import { saveAs } from 'file-saver'

const API = process.env.REACT_APP_API;


export const optionsPostApi = (endpoint) => {
  return fetch(API + endpoint, {
    method: 'OPTIONS',
    headers: {
      'Content-Type': 'application/json',
      Authorization: Auth.authHeader()
    }
  })
  .then(response => Promise.all([response, response.json()]))
  .catch(error => console.error(error))
  .then(([response, json]) => {
    if (json) {
      if (json['detail'] === 'Authentication credentials were not provided.') {
        Auth.login();
      } else if (json['detail'] === "You do not have permission to perform this action.") {
        alert("You are not authorized to perform this action.\nPlease contact the administration team:\nadmin@apsleyfarms.com")
        window.location.replace('/');
      } else {
        return Promise.all([response, json])
      }
    } else {
      return Promise.all([response, json])
    }
  })
}

export const optionsPutApi = (endpoint, callback) => {
  return fetch(API + endpoint, {
    method: 'OPTIONS',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': Auth.authHeader()
    }
  })
  .then(response => Promise.all([response, response.json()]))
  .catch(error => console.error(error))
  .then(([response, json]) => {
    if (json) {
      if (json['detail'] === 'Authentication credentials were not provided.') {
        Auth.login();
      } else if (json['detail'] === "You do not have permission to perform this action.") {
        alert("You are not authorized to perform this action.\nPlease contact the administration team:\nadmin@apsleyfarms.com")
        window.location.replace('/');
      } else {
        return Promise.all([response, json])
      }
    } else {
      return Promise.all([response, json])
    }
  })
}

export const fetchApi = (endpoint) => {
  return fetch(API + endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': Auth.authHeader()
    }
  })
  .then(response => Promise.all([response, response.json()]))
  .catch(error => console.error(error))
  .then(([response, json]) => {
    if (json) {
      if (json['detail'] === 'Authentication credentials were not provided.') {
        Auth.login();
      } else if (json['detail'] === "You do not have permission to perform this action.") {
        alert("You are not authorized to perform this action.\nPlease contact the administration team:\nadmin@apsleyfarms.com")
        window.location.replace('/');
      } else {
        return Promise.all([response, json])
      }
    } else {
      return Promise.all([response, json])
    }
  })
}

export const createApi = (endpoint, data) => {
  return fetch(API + endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': Auth.authHeader()
    },
    body: JSON.stringify(data)
  })
  .then(response => Promise.all([response, response.json()]))
  .catch(error => console.error(error))
  .then(([response, json]) => {
    if (json) {
      if (json['detail'] === 'Authentication credentials were not provided.') {
        Auth.login();
      } else if (json['detail'] === "You do not have permission to perform this action.") {
        alert("You are not authorized to perform this action.\nPlease contact the administration team:\nadmin@apsleyfarms.com")
        window.location.replace('/');
      } else {
        return Promise.all([response, json])
      }
    } else {
      return Promise.all([response, json])
    }
  })
}

export const updateApi = (endpoint, data) => {
  return fetch(API + endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': Auth.authHeader()
    },
    body: JSON.stringify(data)
  })
  .then(response => Promise.all([response, response.json()]))
  .catch(error => console.error(error))
  .then(([response, json]) => {
    if (json) {
      if (json['detail'] === 'Authentication credentials were not provided.') {
        Auth.login();
      } else if (json['detail'] === "You do not have permission to perform this action.") {
        alert("You are not authorized to perform this action.\nPlease contact the administration team:\nadmin@apsleyfarms.com")
        window.location.replace('/');
      } else {
        return Promise.all([response, json])
      }
    } else {
      return Promise.all([response, json])
    }
  })
}

export const partialUpdateApi = (endpoint, data) => {
  return fetch(API + endpoint, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': Auth.authHeader()
    },
    body: JSON.stringify(data)
  })
  .then(response => Promise.all([response, response.json()]))
  .catch(error => console.error(error))
  .then(([response, json]) => {
    if (json) {
      if (json['detail'] === 'Authentication credentials were not provided.') {
        Auth.login();
      } else if (json['detail'] === "You do not have permission to perform this action.") {
        alert("You are not authorized to perform this action.\nPlease contact the administration team:\nadmin@apsleyfarms.com")
        window.location.replace('/');
      } else {
        return Promise.all([response, json])
      }
    } else {
      return Promise.all([response, json])
    }
  })
}

export const destroyApi = (endpoint) => {
  return fetch(API + endpoint, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': Auth.authHeader()
    }
  })
  .catch(error => console.error(error))
  .then((response) => {
    if (response && !response.ok) {
      const json = response.json()
      if (json['detail'] === 'Authentication credentials were not provided.') {
        Auth.login();
      } else if (json['detail'] === "You do not have permission to perform this action.") {
        alert("You are not authorized to perform this action.\nPlease contact the administration team:\nadmin@apsleyfarms.com")
        window.location.replace('/');
      } else {
        return Promise.all([response, json])
      }
    } else {
      return Promise.all([response, {}])
    }
  })
}

export const exportApi = (endpoint, format, name) => {
  return fetch(API + endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': `application/${format}`,
      'Authorization': Auth.authHeader()
    }
  })
  .catch(error => console.error(error))
  .then((response) => {
    if (response && !response.ok) {
      const json = response.json()
      if (json['detail'] === 'Authentication credentials were not provided.') {
        Auth.login();
      } else if (json['detail'] === "You do not have permission to perform this action.") {
        alert("You are not authorized to perform this action.\nPlease contact the administration team:\nadmin@apsleyfarms.com")
        window.location.replace('/');
      } else {
        return response
      }
    } else {
      return response
    }
  })
  .then(response => response.blob())
  .then(blob => saveAs(blob, `${name}.${format}`))
}
