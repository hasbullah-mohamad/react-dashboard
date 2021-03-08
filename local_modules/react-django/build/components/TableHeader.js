'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableHeaderCol = function TableHeaderCol(props) {
  var options = props.options,
      nested = props.nested,
      handleAddSearchParam = props.handleAddSearchParam,
      search = props.search;


  var items = Object.keys(options);
  return items.map(function (item, key) {
    if (options[item]['type'] === 'nested object') {
      return _react2.default.createElement(TableHeaderCol, {
        key: key,
        options: options[item]['children'],
        nested: item.replace('_nested', ''),
        handleAddSearchParam: handleAddSearchParam,
        search: search
      });
    } else {
      var itemValues = options[item];
      return _react2.default.createElement(
        'th',
        { scope: 'col', key: key },
        search ? _react2.default.createElement(
          'a',
          { href: '/', name: nested ? nested + '__' + item : item, onClick: handleAddSearchParam },
          itemValues['label']
        ) : itemValues['label']
      );
    }
  });
};

var TableHeader = function TableHeader(props) {

  return _react2.default.createElement(
    'thead',
    null,
    _react2.default.createElement(
      'tr',
      null,
      _react2.default.createElement(TableHeaderCol, props)
    )
  );
};

exports.default = TableHeader;