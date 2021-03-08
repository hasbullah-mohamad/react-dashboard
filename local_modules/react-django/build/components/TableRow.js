'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableRowCol = function TableRowCol(props) {
  var items = props.items,
      row = props.row,
      options = props.options,
      editable = props.editable,
      history = props.history;


  return items.map(function (item, key) {
    if (options[item]['type'] === 'nested object') {
      var child_items = Object.keys(options[item]['children']);
      return _react2.default.createElement(TableRowCol, { key: key, options: options[item]['children'], items: child_items, row: row[item] });
    } else if (options[item]['type'] === "boolean" && row[item]) {
      return _react2.default.createElement(
        'td',
        { key: key },
        _react2.default.createElement(
          'span',
          { style: { color: 'red' } },
          'X'
        )
      );
    } else if (options[item]['type'] === "datetime") {
      return _react2.default.createElement(
        'td',
        { key: key },
        row[item] ? new Date(row[item]).toLocaleString('en-GB') : ''
      );
    } else if (item === "id" && editable) {
      return _react2.default.createElement(
        'th',
        { key: key, scope: 'row' },
        _react2.default.createElement(
          _reactRouterDom.Link,
          { to: history.location.pathname + '/' + row[item], onClick: function onClick(event) {
              return event.stopPropagation();
            } },
          row[item]
        )
      );
    } else {
      return _react2.default.createElement(
        'td',
        { key: key },
        row[item]
      );
    }
  });
};

var TableRow = function TableRow(props) {
  return _react2.default.createElement(
    'tr',
    {
      key: props.rowKey,
      onClick: function onClick() {
        if (props.historyClick) return props.history.push(props.location.pathname + '/' + props.row.id + '/history');
      }
    },
    _react2.default.createElement(TableRowCol, props)
  );
};

exports.default = (0, _reactRouterDom.withRouter)(TableRow);