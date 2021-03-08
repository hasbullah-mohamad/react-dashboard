'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableBody = function TableBody(props) {
  var data = props.data,
      options = props.options;


  var items = Object.keys(options);

  var childrenWithProps = function childrenWithProps(row, rowKey) {
    return _react2.default.Children.map(props.children, function (child) {
      return _react2.default.cloneElement(child, { row: row, rowKey: rowKey, options: options, items: items });
    });
  };

  if (typeof data === 'undefined') {
    return _react2.default.createElement('tbody', null);
  }

  return _react2.default.createElement(
    'tbody',
    null,
    data.map(function (row, index) {
      return childrenWithProps(row, index);
    })
  );
};

exports.default = TableBody;