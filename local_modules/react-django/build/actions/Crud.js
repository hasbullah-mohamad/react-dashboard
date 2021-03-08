'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportApi = exports.destroyApi = exports.partialUpdateApi = exports.updateApi = exports.createApi = exports.fetchApi = exports.optionsPutApi = exports.optionsPostApi = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _fileSaver = require('file-saver');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var API = process.env.REACT_APP_API;

var optionsPostApi = exports.optionsPostApi = function optionsPostApi(endpoint) {
  return fetch(API + endpoint, {
    method: 'OPTIONS',
    headers: {
      'Content-Type': 'application/json',
      Authorization: _utils2.default.authHeader()
    }
  }).then(function (response) {
    return Promise.all([response, response.json()]);
  }).catch(function (error) {
    return console.error(error);
  }).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        response = _ref2[0],
        json = _ref2[1];

    if (json) {
      if (json['detail'] === 'Authentication credentials were not provided.') {
        _utils2.default.login();
      } else if (json['detail'] === "You do not have permission to perform this action.") {
        alert("You are not authorized to perform this action.\nPlease contact the administration team:\nadmin@apsleyfarms.com");
        window.location.replace('/');
      } else {
        return Promise.all([response, json]);
      }
    } else {
      return Promise.all([response, json]);
    }
  });
};

var optionsPutApi = exports.optionsPutApi = function optionsPutApi(endpoint, callback) {
  return fetch(API + endpoint, {
    method: 'OPTIONS',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': _utils2.default.authHeader()
    }
  }).then(function (response) {
    return Promise.all([response, response.json()]);
  }).catch(function (error) {
    return console.error(error);
  }).then(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        response = _ref4[0],
        json = _ref4[1];

    if (json) {
      if (json['detail'] === 'Authentication credentials were not provided.') {
        _utils2.default.login();
      } else if (json['detail'] === "You do not have permission to perform this action.") {
        alert("You are not authorized to perform this action.\nPlease contact the administration team:\nadmin@apsleyfarms.com");
        window.location.replace('/');
      } else {
        return Promise.all([response, json]);
      }
    } else {
      return Promise.all([response, json]);
    }
  });
};

var fetchApi = exports.fetchApi = function fetchApi(endpoint) {
  return fetch(API + endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': _utils2.default.authHeader()
    }
  }).then(function (response) {
    return Promise.all([response, response.json()]);
  }).catch(function (error) {
    return console.error(error);
  }).then(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        response = _ref6[0],
        json = _ref6[1];

    if (json) {
      if (json['detail'] === 'Authentication credentials were not provided.') {
        _utils2.default.login();
      } else if (json['detail'] === "You do not have permission to perform this action.") {
        alert("You are not authorized to perform this action.\nPlease contact the administration team:\nadmin@apsleyfarms.com");
        window.location.replace('/');
      } else {
        return Promise.all([response, json]);
      }
    } else {
      return Promise.all([response, json]);
    }
  });
};

var createApi = exports.createApi = function createApi(endpoint, data) {
  return fetch(API + endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': _utils2.default.authHeader()
    },
    body: JSON.stringify(data)
  }).then(function (response) {
    return Promise.all([response, response.json()]);
  }).catch(function (error) {
    return console.error(error);
  }).then(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        response = _ref8[0],
        json = _ref8[1];

    if (json) {
      if (json['detail'] === 'Authentication credentials were not provided.') {
        _utils2.default.login();
      } else if (json['detail'] === "You do not have permission to perform this action.") {
        alert("You are not authorized to perform this action.\nPlease contact the administration team:\nadmin@apsleyfarms.com");
        window.location.replace('/');
      } else {
        return Promise.all([response, json]);
      }
    } else {
      return Promise.all([response, json]);
    }
  });
};

var updateApi = exports.updateApi = function updateApi(endpoint, data) {
  return fetch(API + endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': _utils2.default.authHeader()
    },
    body: JSON.stringify(data)
  }).then(function (response) {
    return Promise.all([response, response.json()]);
  }).catch(function (error) {
    return console.error(error);
  }).then(function (_ref9) {
    var _ref10 = _slicedToArray(_ref9, 2),
        response = _ref10[0],
        json = _ref10[1];

    if (json) {
      if (json['detail'] === 'Authentication credentials were not provided.') {
        _utils2.default.login();
      } else if (json['detail'] === "You do not have permission to perform this action.") {
        alert("You are not authorized to perform this action.\nPlease contact the administration team:\nadmin@apsleyfarms.com");
        window.location.replace('/');
      } else {
        return Promise.all([response, json]);
      }
    } else {
      return Promise.all([response, json]);
    }
  });
};

var partialUpdateApi = exports.partialUpdateApi = function partialUpdateApi(endpoint, data) {
  return fetch(API + endpoint, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': _utils2.default.authHeader()
    },
    body: JSON.stringify(data)
  }).then(function (response) {
    return Promise.all([response, response.json()]);
  }).catch(function (error) {
    return console.error(error);
  }).then(function (_ref11) {
    var _ref12 = _slicedToArray(_ref11, 2),
        response = _ref12[0],
        json = _ref12[1];

    if (json) {
      if (json['detail'] === 'Authentication credentials were not provided.') {
        _utils2.default.login();
      } else if (json['detail'] === "You do not have permission to perform this action.") {
        alert("You are not authorized to perform this action.\nPlease contact the administration team:\nadmin@apsleyfarms.com");
        window.location.replace('/');
      } else {
        return Promise.all([response, json]);
      }
    } else {
      return Promise.all([response, json]);
    }
  });
};

var destroyApi = exports.destroyApi = function destroyApi(endpoint) {
  return fetch(API + endpoint, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': _utils2.default.authHeader()
    }
  }).catch(function (error) {
    return console.error(error);
  }).then(function (response) {
    if (response && !response.ok) {
      var json = response.json();
      if (json['detail'] === 'Authentication credentials were not provided.') {
        _utils2.default.login();
      } else if (json['detail'] === "You do not have permission to perform this action.") {
        alert("You are not authorized to perform this action.\nPlease contact the administration team:\nadmin@apsleyfarms.com");
        window.location.replace('/');
      } else {
        return Promise.all([response, json]);
      }
    } else {
      return Promise.all([response, {}]);
    }
  });
};

var exportApi = exports.exportApi = function exportApi(endpoint, format, name) {
  return fetch(API + endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/' + format,
      'Authorization': _utils2.default.authHeader()
    }
  }).catch(function (error) {
    return console.error(error);
  }).then(function (response) {
    if (response && !response.ok) {
      var json = response.json();
      if (json['detail'] === 'Authentication credentials were not provided.') {
        _utils2.default.login();
      } else if (json['detail'] === "You do not have permission to perform this action.") {
        alert("You are not authorized to perform this action.\nPlease contact the administration team:\nadmin@apsleyfarms.com");
        window.location.replace('/');
      } else {
        return response;
      }
    } else {
      return response;
    }
  }).then(function (response) {
    return response.blob();
  }).then(function (blob) {
    return (0, _fileSaver.saveAs)(blob, name + '.' + format);
  });
};