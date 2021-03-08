'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _reactstrap = require('reactstrap');

var _FormItem = require('./FormItem');

var _FormItem2 = _interopRequireDefault(_FormItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormBody = function (_React$Component) {
  _inherits(FormBody, _React$Component);

  function FormBody(props) {
    _classCallCheck(this, FormBody);

    var _this = _possibleConstructorReturn(this, (FormBody.__proto__ || Object.getPrototypeOf(FormBody)).call(this, props));

    _this.state = {
      data: {}
    };
    _this.handleFormSubmit = _this.handleFormSubmit.bind(_this);
    _this.handleFormDestroy = _this.handleFormDestroy.bind(_this);
    _this.handleFormChange = _this.handleFormChange.bind(_this);
    _this.handleFieldParam = _this.handleFieldParam.bind(_this);
    _this.changeNullBlankValues = _this.changeNullBlankValues.bind(_this);
    return _this;
  }

  _createClass(FormBody, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var data = Object.assign({}, this.props.data);

      if (data === {}) {
        data = this.optionToData(this.props.options);
      }

      this.setState({ data: data });
    }
  }, {
    key: 'changeNullBlankValues',
    value: function changeNullBlankValues(value, type) {
      switch (type) {
        case 'number':
          if (value === '') {
            return null;
          } else {
            return value;
          }
        default:
          return value;
      }
    }
  }, {
    key: 'handleFormChange',
    value: function handleFormChange(event) {
      var data = this.state.data;
      var target = event.target;
      var value = target.type === 'checkbox' ? target.checked : target.value;
      var name = target.name;
      data[name] = this.changeNullBlankValues(value, target.type);
      this.setState({ data: data });
    }
  }, {
    key: 'handleFieldParam',
    value: function handleFieldParam() {
      var data = this.state.data;
      var _props = this.props,
          name = _props.name,
          options = _props.options;
      var histId = this.props.match.params.histId;


      if (histId) {
        if (name in options) {
          data[name] = histId;
        } else if ('visitor' in options) {
          // Hack to allow visitor to work for timesheet
          data['visitor'] = histId;
        }
      }
    }
  }, {
    key: 'handleFormSubmit',
    value: function handleFormSubmit(event) {
      event.preventDefault();
      if (this.props.match.params.id === 'add') {
        this.props.handleCreate(this.state.data);
      } else {
        this.props.handleUpdate(this.state.data);
      }
    }
  }, {
    key: 'handleFormDestroy',
    value: function handleFormDestroy(event) {
      event.preventDefault();
      if (this.props.match.params.id !== 'add') {
        if (window.confirm('Are you sure you want to delete this record?')) {
          this.props.handleDestroy(this.state.data);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var data = this.state.data;
      var options = this.props.options;


      if (!options) return _react2.default.createElement(
        'div',
        null,
        'No data'
      );
      if (options.length === 0) return _react2.default.createElement(
        'div',
        null,
        'No data'
      );

      var items = Object.keys(options);

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
          _reactstrap.CardBody,
          null,
          items.map(function (item, key) {
            return _react2.default.createElement(_FormItem2.default, {
              key: key,
              item: item,
              itemKey: key,
              data: data,
              options: options[item],
              handleChange: _this2.handleFormChange,
              handleFieldParam: _this2.handleFieldParam
            });
          })
        ),
        _react2.default.createElement(
          _reactstrap.CardFooter,
          null,
          _react2.default.createElement(
            _reactstrap.Button,
            {
              type: 'submit',
              size: 'sm',
              color: 'primary',
              onClick: this.handleFormSubmit
            },
            _react2.default.createElement('i', { className: 'fa fa-dot-circle-o' }),
            ' Submit'
          ),
          _react2.default.createElement(
            _reactstrap.Button,
            {
              type: 'reset',
              size: 'sm',
              color: 'danger',
              className: 'float-right',
              onClick: this.handleFormDestroy
            },
            _react2.default.createElement('i', { className: 'fa fa-ban' }),
            ' Delete'
          )
        )
      );
    }
  }], [{
    key: 'optionToData',
    value: function optionToData(options) {
      var data = {};
      if (options && options.length !== 0) {
        var items = Object.keys(options);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;
            data[item] = '';
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
      return data;
    }
  }]);

  return FormBody;
}(_react2.default.Component);

exports.default = (0, _reactRouterDom.withRouter)(FormBody);