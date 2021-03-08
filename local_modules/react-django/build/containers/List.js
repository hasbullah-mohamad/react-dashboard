'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require('reactstrap');

var _reactRouterDom = require('react-router-dom');

var _components = require('../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListFilter = (0, _reactRouterDom.withRouter)(function (_ref) {
  var title = _ref.title,
      options = _ref.options,
      getfilteredData = _ref.getfilteredData,
      handleFilter = _ref.handleFilter,
      editable = _ref.editable,
      historyClick = _ref.historyClick,
      match = _ref.match;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_components.Filter, { handleFilter: handleFilter }),
    _react2.default.createElement(
      _reactstrap.Card,
      null,
      _react2.default.createElement(
        _reactstrap.CardHeader,
        null,
        _react2.default.createElement('i', { className: 'fa fa-align-justify' }),
        ' ',
        title || options.name,
        _react2.default.createElement(
          _reactRouterDom.Link,
          { to: match.url + '/add', className: 'pull-right' },
          _react2.default.createElement('i', { className: 'fa fa-plus-square-o fa-lg' })
        )
      ),
      _react2.default.createElement(
        _reactstrap.CardBody,
        null,
        _react2.default.createElement(
          _reactstrap.Table,
          { responsive: true, hover: true },
          _react2.default.createElement(_components.TableHeader, { options: options.actions.POST }),
          _react2.default.createElement(
            _components.TableBody,
            {
              data: getfilteredData(),
              options: options.actions.POST
            },
            _react2.default.createElement(_components.TableRow, { editable: editable, historyClick: historyClick })
          )
        )
      )
    )
  );
});

var ListSearch = (0, _reactRouterDom.withRouter)(function (_ref2) {
  var data = _ref2.data,
      options = _ref2.options,
      page = _ref2.page,
      title = _ref2.title,
      searchParams = _ref2.searchParams,
      handleAddSearchParam = _ref2.handleAddSearchParam,
      handleSearchSubmit = _ref2.handleSearchSubmit,
      handleRemoveSearchParam = _ref2.handleRemoveSearchParam,
      handleRangeSearchParam = _ref2.handleRangeSearchParam,
      handlePage = _ref2.handlePage,
      editable = _ref2.editable,
      historyClick = _ref2.historyClick,
      match = _ref2.match;


  var pageCount = getPageCount({ data: data, page: page });

  if (Object.keys(options).length === 0 && options.constructor === Object) {
    return _react2.default.createElement(
      'div',
      null,
      'Loading...'
    );
  }

  var results = [];
  if (data) {
    results = data.results;
  }

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_components.Search, {
      searchParams: searchParams,
      handleSearchSubmit: handleSearchSubmit,
      handleRemoveSearchParam: handleRemoveSearchParam,
      handleRangeSearchParam: handleRangeSearchParam
    }),
    _react2.default.createElement(
      _reactstrap.Card,
      null,
      _react2.default.createElement(
        _reactstrap.CardHeader,
        null,
        _react2.default.createElement('i', { className: 'fa fa-align-justify' }),
        ' ',
        title || options.name,
        _react2.default.createElement(
          _reactRouterDom.Link,
          { to: match.url + '/add', className: 'pull-right' },
          _react2.default.createElement('i', { className: 'fa fa-plus-square-o fa-lg' })
        )
      ),
      _react2.default.createElement(
        _reactstrap.CardBody,
        null,
        _react2.default.createElement(_components.Pagination, {
          page: page,
          pageCount: pageCount,
          handleChange: handlePage
        }),
        _react2.default.createElement(
          _reactstrap.Table,
          { responsive: true, hover: true },
          _react2.default.createElement(_components.TableHeader, {
            options: options.actions.POST,
            search: true,
            handleAddSearchParam: handleAddSearchParam
          }),
          _react2.default.createElement(
            _components.TableBody,
            {
              data: results,
              options: options.actions.POST
            },
            _react2.default.createElement(_components.TableRow, { editable: true })
          )
        )
      )
    )
  );
});

function getPageCount(_ref3) {
  var data = _ref3.data,
      page = _ref3.page;

  if (typeof data !== 'undefined') {
    var pageCount = Math.ceil(data.count / 100);
    if (pageCount === 0) {
      pageCount = 1;
    }
    return pageCount;
  } else {
    return page;
  }
}

var List = function List(props) {
  if (props.filterType === 'search') {
    return _react2.default.createElement(ListSearch, props);
  } else {
    return _react2.default.createElement(ListFilter, props);
  }
};

exports.default = List;