import { goBack } from 'connected-react-router'
import Crud from '.';

const queryString = require('qs');


export function fetch(reducer, name, endpoint, queryObj) {

  return dispatch => {
    dispatch(fetchOptions(reducer, name, endpoint, queryObj));
    dispatch(fetchData(reducer, name, endpoint, queryObj));
  };

}

export function fetchData(reducer, name, endpoint, queryObj) {
  
  const query = queryString.stringify(queryObj);

  return dispatch => {
    dispatch({
      type: `@@${reducer}/FETCH_BEGIN`
    });
    return Crud.fetchApi(`${endpoint}?${query}`)
      .then(([response, json]) => {
        dispatch({
          type: `@@${reducer}/FETCH_SUCCESS`,
          title: name,
          payload: json
        });
        return json;
      })
      .catch(error => {
        dispatch({
          type: `@@${reducer}/FETCH_FAILURE`,
          payload: error
        })
        console.error(error)
      });
  };
}

export function fetchInstance(reducer, name, endpoint, queryObj) {
  
  const query = queryString.stringify(queryObj);

  return dispatch => {
    dispatch({
      type: `@@${reducer}/FETCH_BEGIN`
    });
    return Crud.fetchApi(`${endpoint}?${query}`)
      .then(([response, json]) => {
        // dispatch({
        //   type: `@@${reducer}/FETCH_SUCCESS`,
        //   title: `name_${id}`,
        //   payload: json
        // });
        return json;
      })
      .catch(error => {
        // dispatch({
        //   type: `@@${reducer}/FETCH_FAILURE`,
        //   payload: error
        // })
        console.error(error)
      });
  };
}

export function fetchOptions(reducer, name, endpoint, queryObj) {
  
  const query = queryString.stringify(queryObj);

  endpoint = endpoint.replace(/(\/\d+)|(\/add)/, '')

  return dispatch => {
    dispatch({
      type: `@@${reducer}/FETCH_OPTIONS_BEGIN`
    });
    return Crud.optionsPostApi(endpoint)
      .then(([response, json]) => {
        dispatch({
          type: `@@${reducer}/FETCH_OPTIONS_SUCCESS`,
          title: `${name}Options`,
          payload: json
        });
        return json;
      })
      .catch(error => {
        dispatch({
          type: `@@${reducer}/FETCH_OPTIONS_FAILURE`,
          payload: error
        })
        console.error(error)
      });
  };
}

export function create(reducer, name, endpoint, queryObj, data) {
  
  const query = queryString.stringify(queryObj);

  let cleanedEndpoint = endpoint;
  if (/\/add\/$/.test(cleanedEndpoint)) {
    cleanedEndpoint = cleanedEndpoint.replace(/\/add\/$/, '/')
  }

  return dispatch => {
    dispatch({
      type: `@@${reducer}/CREATE_BEGIN`
    });
    return Crud.createApi(cleanedEndpoint, data)
      .then(([response, json]) => {
        if (response.ok) {
          dispatch({
            type: `@@${reducer}/CREATE_SUCCESS`,
            title: name,
            payload: json
          });
          dispatch(goBack())
          return json;
        } else {
          alert(JSON.stringify(json))
        }
      })
      .catch(error => {
        dispatch({
          type: `@@${reducer}/CREATE_FAILURE`,
          payload: error
        })
        console.error(error)
      });
  };
}

export function update(reducer, name, endpoint, queryObj, data) {

  const query = queryString.stringify(queryObj);

  return dispatch => {
    dispatch({
      type: `@@${reducer}/UPDATE_BEGIN`
    });
    return Crud.updateApi(`${endpoint}?${query}`, data)
      .then(([response, json]) => {
        if (response.ok) {
          dispatch({
            type: `@@${reducer}/UPDATE_SUCCESS`,
            title: name,
            payload: json
          });
          dispatch(goBack())
          return json;
        } else {
          alert(JSON.stringify(json))
        }
      })
      .catch(error => {
        dispatch({
          type: `@@${reducer}/UPDATE_FAILURE`,
          payload: error
        })
        console.error(error)
      });
  };
}

export function partialUpdate(reducer, name, endpoint, queryObj, data) {
  
  const query = queryString.stringify(queryObj);

  return dispatch => {
    dispatch({
      type: `@@${reducer}/PARTIAL_UPDATE_BEGIN`
    });
    return Crud.partialUpdateApi(`${endpoint}?${query}`, data)
      .then(([response, json]) => {
        if (response.ok) {
          dispatch({
            type: `@@${reducer}/PARTIAL_UPDATE_SUCCESS`,
            title: name,
            payload: json
          });
          dispatch(goBack())
          return json;
        } else {
          alert(JSON.stringify(json))
        }
      })
      .catch(error => {
        dispatch({
          type: `@@${reducer}/PARTIAL_UPDATE_FAILURE`,
          payload: error
        })
        console.error(error)
      });
  };
}

export function destroy(reducer, name, endpoint, queryObj, data) {

  const query = queryString.stringify(queryObj);

  return dispatch => {
    dispatch({
      type: `@@${reducer}/DESTROY_BEGIN`
    });
    return Crud.destroyApi(`${endpoint}?${query}`)
      .then(([response, json]) => {
        if (response.ok) {
          dispatch({
            type: `@@${reducer}/DESTROY_SUCCESS`,
            title: name,
            payload: data.id
          });
          dispatch(goBack())
        } else {
          alert(JSON.stringify(json))
        }
      })
      .catch(error => {
        dispatch({
          type: `@@${reducer}/DESTROY_FAILURE`,
          payload: error
        })
        console.error(error)
      });
  };
}
