'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reduxActions = require('../actions/reduxActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function withRedux(WrappedComponent, _ref) {
  var reducer = _ref.reducer,
      name = _ref.name,
      endpoint = _ref.endpoint,
      query = _ref.query,
      title = _ref.title,
      hoc = _ref.hoc,
      options = _objectWithoutProperties(_ref, ['reducer', 'name', 'endpoint', 'query', 'title', 'hoc']);

  var ReduxComponent = function (_Component) {
    _inherits(ReduxComponent, _Component);

    function ReduxComponent() {
      _classCallCheck(this, ReduxComponent);

      return _possibleConstructorReturn(this, (ReduxComponent.__proto__ || Object.getPrototypeOf(ReduxComponent)).apply(this, arguments));
    }

    _createClass(ReduxComponent, [{
      key: 'render',
      value: function render() {

        return _react2.default.createElement(WrappedComponent, _extends({}, options, this.props, { title: title }));
      }
    }]);

    return ReduxComponent;
  }(_react.Component);

  function mapStateToProps(state) {
    return {
      data: state[reducer][name],
      options: state[reducer][name + 'Options']
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      handleFetch: (0, _redux.bindActionCreators)(function (newQuery) {
        return (0, _reduxActions.fetch)(reducer, name, endpoint, _extends({}, query, newQuery));
      }, dispatch),
      handleFetchData: (0, _redux.bindActionCreators)(function (newQuery) {
        return (0, _reduxActions.fetchData)(reducer, name, endpoint, _extends({}, query, newQuery));
      }, dispatch),
      handleFetchInstance: (0, _redux.bindActionCreators)(function (newQuery) {
        return (0, _reduxActions.fetchInstance)(reducer, name, endpoint, _extends({}, query, newQuery));
      }, dispatch),
      handleFetchOptions: (0, _redux.bindActionCreators)(function (newQuery) {
        return (0, _reduxActions.fetchOptions)(reducer, name, endpoint, _extends({}, query, newQuery));
      }, dispatch),
      handleCreate: (0, _redux.bindActionCreators)(function (data, newQuery) {
        return (0, _reduxActions.create)(reducer, name, endpoint, _extends({}, query, newQuery), data);
      }, dispatch),
      handleUpdate: (0, _redux.bindActionCreators)(function (data, newQuery) {
        return (0, _reduxActions.update)(reducer, name, endpoint, _extends({}, query, newQuery), data);
      }, dispatch),
      handlePartialUpdate: (0, _redux.bindActionCreators)(function (data, newQuery) {
        return (0, _reduxActions.partialUpdate)(reducer, name, endpoint, _extends({}, query, newQuery), data);
      }, dispatch),
      handleDestroy: (0, _redux.bindActionCreators)(function (data, newQuery) {
        return (0, _reduxActions.destroy)(reducer, name, endpoint, _extends({}, query, newQuery), data);
      }, dispatch)
    };
  }

  if (hoc) {
    return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(hoc(ReduxComponent));
  } else {
    return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ReduxComponent);
  }
}

exports.default = withRedux;