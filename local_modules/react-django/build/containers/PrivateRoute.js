"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _utils = require("../utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var PrivateRoute = (0, _reactRouterDom.withRouter)(function (_ref) {
  var history = _ref.history,
      Component = _ref.component,
      Render = _ref.render,
      rest = _objectWithoutProperties(_ref, ["history", "component", "render"]);

  if (_utils2.default.isLoggedIn()) {
    return _react2.default.createElement(_reactRouterDom.Route, _extends({}, rest, {
      render: function render(props) {
        return Component ? _react2.default.createElement(Component, props) : Render(props);
      }
    }));
  } else {
    if (_utils2.default.getStayLoggedIn()) {
      localStorage.setItem('callback_uri', window.location.pathname);
      _utils2.default.login();
    } else {
      localStorage.setItem('callback_uri', window.location.pathname);
      history.push('/login');
    }
    return null;
  }
});

exports.default = PrivateRoute;