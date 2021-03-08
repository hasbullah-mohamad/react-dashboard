'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require('reactstrap');

var _components = require('../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Instance = function (_Component) {
  _inherits(Instance, _Component);

  function Instance() {
    _classCallCheck(this, Instance);

    var _this = _possibleConstructorReturn(this, (Instance.__proto__ || Object.getPrototypeOf(Instance)).call(this));

    _this.state = {
      instance: ''
    };
    return _this;
  }

  _createClass(Instance, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var id = this.props.match.params.id;


      if (this.props.options) {} else {
        this.props.handleFetchOptions();
      }

      if (id === 'add') {
        this.setState({ instance: {} });
      } else {
        this.props.handleFetchInstance().then(function (instance) {
          _this2.setState({ instance: instance });
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          data = _props.data,
          match = _props.match,
          options = _props.options,
          title = _props.title,
          rest = _objectWithoutProperties(_props, ['data', 'match', 'options', 'title']);

      var instance = this.state.instance;


      if (!instance) {
        return _react2.default.createElement(
          'div',
          null,
          'Loading...'
        );
      }

      var undefinedObject = function undefinedObject(obj) {
        return typeof obj === 'undefined';
      };
      var emptyOject = function emptyOject(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
      };

      if (undefinedObject(options) || emptyOject(options)) {
        return _react2.default.createElement(
          'div',
          null,
          'Loading...'
        );
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactstrap.Card,
          null,
          _react2.default.createElement(
            _reactstrap.CardHeader,
            null,
            title || options.name
          ),
          _react2.default.createElement(_components.FormBody, _extends({ data: instance, options: options.actions.POST }, rest))
        )
      );
    }
  }]);

  return Instance;
}(_react.Component);

exports.default = Instance;