'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require('reactstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = function (_React$Component) {
  _inherits(Search, _React$Component);

  function Search(props) {
    _classCallCheck(this, Search);

    var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));

    _this.state = {
      searchParams: {}
    };
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(Search, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var searchParams = this.props.searchParams;
      this.setState({ searchParams: searchParams });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.searchParams !== this.props.searchParams) {
        this.setState({ searchParams: this.props.searchParams });
      }
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();
      var searchParams = this.state.searchParams;

      this.props.handleSearchSubmit(searchParams);
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      var searchParams = this.state.searchParams;
      var target = event.target;
      var value = target.type === 'checkbox' ? target.checked : target.value;
      var name = target.name;
      searchParams[name]['value'] = value;
      this.setState({ searchParams: searchParams });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var searchParams = this.state.searchParams;


      var searchKeys = Object.keys(searchParams);

      var searchBody = searchKeys.filter(function (searchKey, key) {
        if (searchParams[searchKey]['show']) {
          return true;
        } else {
          return null;
        }
      }).map(function (searchKey, key) {
        return _react2.default.createElement(
          _reactstrap.FormGroup,
          { row: true, key: key },
          _react2.default.createElement(
            _reactstrap.Col,
            { md: '6' },
            _react2.default.createElement(
              _reactstrap.InputGroup,
              null,
              _react2.default.createElement(
                _reactstrap.InputGroupAddon,
                { addonType: 'prepend' },
                _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement(
                    'a',
                    {
                      name: searchKey,
                      className: 'input-group-text',
                      id: 'inputSearch',
                      onClick: _this2.props.handleRangeSearchParam
                    },
                    searchParams[searchKey]['label']
                  )
                )
              ),
              _react2.default.createElement(_reactstrap.Input, {
                type: searchParams[searchKey]['type'] === 'datetime' ? 'datetime-local' : searchParams[searchKey]['type'],
                name: searchKey,
                className: 'form-control',
                'aria-label': 'Small',
                'aria-describedby': 'inputSearch',
                value: searchParams[searchKey]['value'] || '',
                onChange: _this2.handleChange,
                autoComplete: 'off'
              }),
              _react2.default.createElement(
                _reactstrap.Button,
                {
                  type: 'button',
                  className: 'close',
                  'aria-label': 'Close'
                },
                _react2.default.createElement(
                  'a',
                  {
                    name: searchKey,
                    onClick: _this2.props.handleRemoveSearchParam
                  },
                  '\xD7'
                )
              )
            )
          )
        );
      });

      return _react2.default.createElement(
        'form',
        { onSubmit: this.handleSubmit },
        searchBody,
        searchBody.length ? _react2.default.createElement(
          'button',
          { type: 'submit', className: 'btn btn-primary mb-3' },
          'Submit'
        ) : null
      );
    }
  }]);

  return Search;
}(_react2.default.Component);

exports.default = Search;