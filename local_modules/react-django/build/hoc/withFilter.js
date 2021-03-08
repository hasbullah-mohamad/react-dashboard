'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function withFilter(WrappedComponent) {
  return function (_Component) {
    _inherits(_class, _Component);

    function _class() {
      _classCallCheck(this, _class);

      var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

      _this.state = {
        value: ''
      };
      _this.handleFilter = _this.handleFilter.bind(_this);
      _this.getfilteredData = _this.getfilteredData.bind(_this);
      return _this;
    }

    _createClass(_class, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.props.handleFetch();
      }
    }, {
      key: 'handleFilter',
      value: function handleFilter(event) {
        this.setState({ value: event.target.value });
      }
    }, {
      key: 'getfilteredData',
      value: function getfilteredData() {
        var value = this.state.value;
        var data = this.props.data;


        if (typeof data === 'undefined') {
          return [];
        }

        return data.filter(function (item) {
          return filterObject(item, value);
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var undefinedObject = function undefinedObject(obj) {
          return typeof obj === 'undefined';
        };
        var emptyOject = function emptyOject(obj) {
          return Object.keys(obj).length === 0 && obj.constructor === Object;
        };

        if (undefinedObject(this.props.options) || emptyOject(this.props.options)) {
          return _react2.default.createElement(
            'div',
            null,
            'Loading...'
          );
        }

        return _react2.default.createElement(WrappedComponent, _extends({
          getfilteredData: this.getfilteredData,
          handleFilter: this.handleFilter
        }, this.props));
      }
    }]);

    return _class;
  }(_react.Component);
}

function filterObject(obj, filter) {
  if (!obj || typeof obj === "undefined") {
    return false;
  }

  var values = Object.values(obj);
  return values.some(function (value) {
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === "object") {
      return filterObject(value, filter);
    } else {
      return value.toString().toLowerCase().indexOf(filter.toLowerCase()) > -1;
    }
  });
}

exports.default = withFilter;