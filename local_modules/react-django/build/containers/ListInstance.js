'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withRedux = require('../hoc/withRedux');

var _withRedux2 = _interopRequireDefault(_withRedux);

var _reactRouterDom = require('react-router-dom');

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _Instance = require('./Instance');

var _Instance2 = _interopRequireDefault(_Instance);

var _withFilter = require('../hoc/withFilter');

var _withFilter2 = _interopRequireDefault(_withFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListInstance = function (_React$Component) {
  _inherits(ListInstance, _React$Component);

  function ListInstance(props) {
    _classCallCheck(this, ListInstance);

    var _this = _possibleConstructorReturn(this, (ListInstance.__proto__ || Object.getPrototypeOf(ListInstance)).call(this, props));

    _this.state = {
      reducer: props.reducer || props.match.params.reducer,
      name: props.name || props.match.params.name,
      title: props.title || '',
      filterType: props.filterType || 'filter',
      hoc: props.hoc || _withFilter2.default
    };
    _this.WrappedList = (0, _withRedux2.default)(_List2.default, {
      reducer: _this.state.reducer,
      name: _this.state.name,
      endpoint: _this.state.reducer + '/' + _this.state.name + '/',
      query: {},
      title: _this.state.title,
      hoc: _this.state.hoc,
      editable: true,
      filterType: _this.state.filter
    });
    _this.WrappedInstance = (0, _withRedux2.default)(_Instance2.default, {
      reducer: _this.state.reducer,
      name: _this.state.name,
      endpoint: _this.state.reducer + '/' + _this.state.name + '/' + props.match.params.id + '/',
      query: {},
      title: _this.state.title + ' Details'
    });
    return _this;
  }

  _createClass(ListInstance, [{
    key: 'selectComponent',
    value: function selectComponent() {
      var params = this.props.match.params;

      if (params.id) {
        return _react2.default.createElement(this.WrappedInstance, this.props);
      } else if (params.reducer || params.name) {
        return _react2.default.createElement(this.WrappedList, this.props);
      } else if (Object.keys(params).length === 0 && params.constructor === Object) {
        return _react2.default.createElement(this.WrappedList, this.props);
      } else {
        return _react2.default.createElement(_reactRouterDom.Redirect, { to: '/dashboard' });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.reducer && this.state.name) {
        return this.selectComponent();
      } else {
        return _react2.default.createElement(_reactRouterDom.Redirect, { to: '/dashboard' });
      }
    }
  }]);

  return ListInstance;
}(_react2.default.Component);

exports.default = ListInstance;