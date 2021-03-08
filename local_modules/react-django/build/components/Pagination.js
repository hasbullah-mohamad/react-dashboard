'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require('reactstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pagination = function pagination(props) {
  return _react2.default.createElement(
    _reactstrap.Pagination,
    null,
    _react2.default.createElement(
      _reactstrap.PaginationItem,
      { disabled: props.page === 1 },
      _react2.default.createElement(
        _reactstrap.PaginationLink,
        {
          tag: 'button',
          onClick: function onClick() {
            return props.handleChange(1 - props.page);
          }
        },
        props.page
      )
    ),
    _react2.default.createElement(
      _reactstrap.PaginationItem,
      { disabled: props.page <= 1 },
      _react2.default.createElement(_reactstrap.PaginationLink, {
        previous: true,
        tag: 'button',
        onClick: function onClick() {
          return props.handleChange(-1);
        }
      })
    ),
    _react2.default.createElement(
      _reactstrap.PaginationItem,
      { disabled: props.page >= props.pageCount },
      _react2.default.createElement(_reactstrap.PaginationLink, {
        next: true,
        tag: 'button',
        onClick: function onClick() {
          return props.handleChange(1);
        }
      })
    ),
    _react2.default.createElement(
      _reactstrap.PaginationItem,
      { disabled: props.page === props.pageCount },
      _react2.default.createElement(
        _reactstrap.PaginationLink,
        {
          tag: 'button',
          onClick: function onClick() {
            return props.handleChange(props.pageCount - props.page);
          }
        },
        props.pageCount
      )
    )
  );
};

exports.default = pagination;