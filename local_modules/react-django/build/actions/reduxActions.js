'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.fetch = fetch;
exports.fetchData = fetchData;
exports.fetchInstance = fetchInstance;
exports.fetchOptions = fetchOptions;
exports.create = create;
exports.update = update;
exports.partialUpdate = partialUpdate;
exports.destroy = destroy;

var _connectedReactRouter = require('connected-react-router');

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var queryString = require('qs');

function fetch(reducer, name, endpoint, queryObj) {

  return function (dispatch) {
    dispatch(fetchOptions(reducer, name, endpoint, queryObj));
    dispatch(fetchData(reducer, name, endpoint, queryObj));
  };
}

function fetchData(reducer, name, endpoint, queryObj) {

  var query = queryString.stringify(queryObj);

  return function (dispatch) {
    dispatch({
      type: '@@' + reducer + '/FETCH_BEGIN'
    });
    return _2.default.fetchApi(endpoint + '?' + query).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          response = _ref2[0],
          json = _ref2[1];

      dispatch({
        type: '@@' + reducer + '/FETCH_SUCCESS',
        title: name,
        payload: json
      });
      return json;
    }).catch(function (error) {
      dispatch({
        type: '@@' + reducer + '/FETCH_FAILURE',
        payload: error
      });
      console.error(error);
    });
  };
}

function fetchInstance(reducer, name, endpoint, queryObj) {

  var query = queryString.stringify(queryObj);

  return function (dispatch) {
    dispatch({
      type: '@@' + reducer + '/FETCH_BEGIN'
    });
    return _2.default.fetchApi(endpoint + '?' + query).then(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          response = _ref4[0],
          json = _ref4[1];

      // dispatch({
      //   type: `@@${reducer}/FETCH_SUCCESS`,
      //   title: `name_${id}`,
      //   payload: json
      // });
      return json;
    }).catch(function (error) {
      // dispatch({
      //   type: `@@${reducer}/FETCH_FAILURE`,
      //   payload: error
      // })
      console.error(error);
    });
  };
}

function fetchOptions(reducer, name, endpoint, queryObj) {

  var query = queryString.stringify(queryObj);

  endpoint = endpoint.replace(/(\/\d+)|(\/add)/, '');

  return function (dispatch) {
    dispatch({
      type: '@@' + reducer + '/FETCH_OPTIONS_BEGIN'
    });
    return _2.default.optionsPostApi(endpoint).then(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
          response = _ref6[0],
          json = _ref6[1];

      dispatch({
        type: '@@' + reducer + '/FETCH_OPTIONS_SUCCESS',
        title: name + 'Options',
        payload: json
      });
      return json;
    }).catch(function (error) {
      dispatch({
        type: '@@' + reducer + '/FETCH_OPTIONS_FAILURE',
        payload: error
      });
      console.error(error);
    });
  };
}

function create(reducer, name, endpoint, queryObj, data) {

  var query = queryString.stringify(queryObj);

  var cleanedEndpoint = endpoint;
  if (/\/add\/$/.test(cleanedEndpoint)) {
    cleanedEndpoint = cleanedEndpoint.replace(/\/add\/$/, '/');
  }

  return function (dispatch) {
    dispatch({
      type: '@@' + reducer + '/CREATE_BEGIN'
    });
    return _2.default.createApi(cleanedEndpoint, data).then(function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 2),
          response = _ref8[0],
          json = _ref8[1];

      if (response.ok) {
        dispatch({
          type: '@@' + reducer + '/CREATE_SUCCESS',
          title: name,
          payload: json
        });
        dispatch((0, _connectedReactRouter.goBack)());
        return json;
      } else {
        alert(JSON.stringify(json));
      }
    }).catch(function (error) {
      dispatch({
        type: '@@' + reducer + '/CREATE_FAILURE',
        payload: error
      });
      console.error(error);
    });
  };
}

function update(reducer, name, endpoint, queryObj, data) {

  var query = queryString.stringify(queryObj);

  return function (dispatch) {
    dispatch({
      type: '@@' + reducer + '/UPDATE_BEGIN'
    });
    return _2.default.updateApi(endpoint + '?' + query, data).then(function (_ref9) {
      var _ref10 = _slicedToArray(_ref9, 2),
          response = _ref10[0],
          json = _ref10[1];

      if (response.ok) {
        dispatch({
          type: '@@' + reducer + '/UPDATE_SUCCESS',
          title: name,
          payload: json
        });
        dispatch((0, _connectedReactRouter.goBack)());
        return json;
      } else {
        alert(JSON.stringify(json));
      }
    }).catch(function (error) {
      dispatch({
        type: '@@' + reducer + '/UPDATE_FAILURE',
        payload: error
      });
      console.error(error);
    });
  };
}

function partialUpdate(reducer, name, endpoint, queryObj, data) {

  var query = queryString.stringify(queryObj);

  return function (dispatch) {
    dispatch({
      type: '@@' + reducer + '/PARTIAL_UPDATE_BEGIN'
    });
    return _2.default.partialUpdateApi(endpoint + '?' + query, data).then(function (_ref11) {
      var _ref12 = _slicedToArray(_ref11, 2),
          response = _ref12[0],
          json = _ref12[1];

      if (response.ok) {
        dispatch({
          type: '@@' + reducer + '/PARTIAL_UPDATE_SUCCESS',
          title: name,
          payload: json
        });
        dispatch((0, _connectedReactRouter.goBack)());
        return json;
      } else {
        alert(JSON.stringify(json));
      }
    }).catch(function (error) {
      dispatch({
        type: '@@' + reducer + '/PARTIAL_UPDATE_FAILURE',
        payload: error
      });
      console.error(error);
    });
  };
}

function destroy(reducer, name, endpoint, queryObj, data) {

  var query = queryString.stringify(queryObj);

  return function (dispatch) {
    dispatch({
      type: '@@' + reducer + '/DESTROY_BEGIN'
    });
    return _2.default.destroyApi(endpoint + '?' + query).then(function (_ref13) {
      var _ref14 = _slicedToArray(_ref13, 2),
          response = _ref14[0],
          json = _ref14[1];

      if (response.ok) {
        dispatch({
          type: '@@' + reducer + '/DESTROY_SUCCESS',
          title: name,
          payload: data.id
        });
        dispatch((0, _connectedReactRouter.goBack)());
      } else {
        alert(JSON.stringify(json));
      }
    }).catch(function (error) {
      dispatch({
        type: '@@' + reducer + '/DESTROY_FAILURE',
        payload: error
      });
      console.error(error);
    });
  };
}