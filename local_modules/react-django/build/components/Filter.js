'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require('reactstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filter = function filter(props) {
  return _react2.default.createElement(
    _reactstrap.FormGroup,
    { row: true },
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
            _reactstrap.Button,
            { type: 'button', color: 'primary' },
            _react2.default.createElement('i', { className: 'fa fa-search' }),
            ' Filter'
          )
        ),
        _react2.default.createElement(_reactstrap.Input, {
          type: 'text',
          id: 'input-filter',
          name: 'input-filter',
          placeholder: '',
          onChange: props.handleFilter
        })
      )
    )
  );
};

exports.default = filter;