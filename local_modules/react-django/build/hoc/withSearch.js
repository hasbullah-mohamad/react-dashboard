'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var queryString = require('qs');

function withSearch(WrappedComponent) {
  return function (_Component) {
    _inherits(_class, _Component);

    function _class() {
      _classCallCheck(this, _class);

      var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

      _this.state = {
        queryParams: { 'page': 1 },
        searchParams: {}
      };
      _this.handlePage = _this.handlePage.bind(_this);
      _this.handleSearchSubmit = _this.handleSearchSubmit.bind(_this);
      _this.handleAddSearchParam = _this.handleAddSearchParam.bind(_this);
      _this.handleRemoveSearchParam = _this.handleRemoveSearchParam.bind(_this);
      _this.handleRangeSearchParam = _this.handleRangeSearchParam.bind(_this);
      return _this;
    }

    _createClass(_class, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        if (this.props.options) {
          this.getOptionsData();
        } else {
          this.props.handleFetchOptions().then(function () {
            _this2.getOptionsData();
          });
        }
      }
    }, {
      key: 'getOptionsData',
      value: function getOptionsData() {
        var _this3 = this;

        this.createPaginationQuery(function () {
          _this3.createSearchParams(_this3.props.options.actions.POST, function () {
            var search = _this3.props.location.search;

            var query = queryString.parse(search.slice(1));
            _this3.props.handleFetchData(query);
          });
        });
      }
    }, {
      key: 'createPaginationQuery',
      value: function createPaginationQuery(callback) {
        var queryParams = this.state.queryParams;
        var search = this.props.location.search;


        var query = queryString.parse(search.slice(1));

        if ('page' in query) {
          queryParams['page'] = parseInt(query['page'], 10);
          this.setState({ queryParams: queryParams }, callback);
        } else {
          callback();
        }
      }
    }, {
      key: 'handlePage',
      value: function handlePage(change) {
        var queryParams = this.state.queryParams;
        var history = this.props.history;

        queryParams['page'] += change;
        var query = queryString.stringify(queryParams);
        history.push({ search: '?' + query });
        this.setState({ queryParams: queryParams }, this.getOptionsData);
      }
    }, {
      key: 'createSearchParams',
      value: function createSearchParams(options, callback) {
        var searchParams = {};
        for (var option in options) {
          searchParams[option] = options[option];
          searchParams[option]['value'] = '';
          searchParams[option]['show'] = false;
        }

        var queryParams = this.state.queryParams;
        var search = this.props.location.search;

        var queries = queryString.parse(search.substr(1));

        for (var query in queries) {
          try {
            if (query.indexOf('__gte') > -1) {
              var name = query.substr(0, query.indexOf('__gte'));
              searchParams[name + '__gte'] = Object.assign({}, searchParams[name]);
              searchParams[name + '__gte']['value'] = queries[query];
              searchParams[name + '__gte']['label'] = searchParams[name]['label'] + ' From';
              searchParams[name + '__gte']['show'] = true;
              queryParams[query] = queries[query];
            } else if (query.indexOf('__lte') > -1) {
              var _name = query.substr(0, query.indexOf('__lte'));
              searchParams[_name + '__lte'] = Object.assign({}, searchParams[_name]);
              searchParams[_name + '__lte']['value'] = queries[query];
              searchParams[_name + '__lte']['label'] = searchParams[_name]['label'] + ' To';
              searchParams[_name + '__lte']['show'] = true;
              queryParams[query] = queries[query];
            } else if (query.indexOf('__') > -1) {
              var nested = query.substr(0, query.indexOf('__'));
              var _name2 = query.substr(query.indexOf('__') + 2);
              searchParams[nested + '__' + _name2] = Object.assign({}, searchParams[nested + '_nested']['children'][_name2]);
              searchParams[nested + '__' + _name2]['value'] = queries[query];
              searchParams[nested + '__' + _name2]['show'] = true;
              queryParams[query] = queries[query];
            } else {
              searchParams[query]['value'] = queries[query];
              searchParams[query]['show'] = true;
              queryParams[query] = queries[query];
            }
          } catch (err) {}
        }

        this.setState({ searchParams: searchParams }, function () {
          callback();
        });
      }
    }, {
      key: 'handleSearchSubmit',
      value: function handleSearchSubmit(newSearchParams) {
        var _state = this.state,
            queryParams = _state.queryParams,
            searchParams = _state.searchParams;
        var history = this.props.history;


        for (var searchKey in newSearchParams) {
          if (newSearchParams[searchKey]['show'] && newSearchParams[searchKey]['value'] !== '') {
            queryParams[searchKey] = newSearchParams[searchKey]['value'];
            searchParams[searchKey]['value'] = newSearchParams[searchKey]['value'];
          } else {
            delete queryParams[searchKey];
          }
        }

        queryParams['page'] = 1;

        var query = queryString.stringify(queryParams);
        history.push({ search: '?' + query });
        this.setState({ queryParams: queryParams }, this.getOptionsData);
      }
    }, {
      key: 'handleAddSearchParam',
      value: function handleAddSearchParam(event) {
        event.preventDefault();
        var searchParams = this.state.searchParams;
        var name = event.target.name;

        if (name.indexOf('__') > -1) {
          var nested = name.substr(0, name.indexOf('__'));
          var value = name.substr(name.indexOf('__') + 2);
          searchParams[nested + '__' + value] = Object.assign({}, searchParams[nested + '_nested']['children'][value]);
          searchParams[nested + '__' + value]['value'] = '';
          searchParams[nested + '__' + value]['show'] = true;
        } else {
          searchParams[name]['value'] = '';
          searchParams[name]['show'] = true;
        }

        this.setState({ searchParams: searchParams });
      }
    }, {
      key: 'handleRemoveSearchParam',
      value: function handleRemoveSearchParam(event) {
        var _this4 = this;

        var searchParams = this.state.searchParams;
        var name = event.target.name;

        searchParams[name]['value'] = '';
        searchParams[name]['show'] = false;

        this.setState({ searchParams: searchParams }, function () {
          _this4.handleSearchSubmit(searchParams);
        });
      }
    }, {
      key: 'handleRangeSearchParam',
      value: function handleRangeSearchParam(event) {
        var searchParams = this.state.searchParams;
        var name = event.target.name;

        if (name.indexOf('__gte') === -1 && name.indexOf('__lte') === -1) {
          searchParams[name]['show'] = false;
          searchParams[name + '__gte'] = Object.assign({}, searchParams[name]);
          searchParams[name + '__gte']['value'] = '';
          searchParams[name + '__gte']['label'] = searchParams[name]['label'] + ' From';
          searchParams[name + '__gte']['show'] = true;
          searchParams[name + '__lte'] = Object.assign({}, searchParams[name]);
          searchParams[name + '__lte']['value'] = '';
          searchParams[name + '__lte']['label'] = searchParams[name]['label'] + ' To';
          searchParams[name + '__lte']['show'] = true;
        }

        this.setState({ searchParams: searchParams });
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
          searchParams: this.state.searchParams,
          handleAddSearchParam: this.handleAddSearchParam,
          handleRemoveSearchParam: this.handleRemoveSearchParam,
          handleRangeSearchParam: this.handleRangeSearchParam,
          handleSearchSubmit: this.handleSearchSubmit,
          page: this.state.queryParams.page,
          handlePage: this.handlePage
        }, this.props));
      }
    }]);

    return _class;
  }(_react.Component);
}

exports.default = withSearch;