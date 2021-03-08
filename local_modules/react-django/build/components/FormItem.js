'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require('reactstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormItem = function FormItem(_ref) {
  var itemKey = _ref.itemKey,
      item = _ref.item,
      data = _ref.data,
      options = _ref.options,
      handleChange = _ref.handleChange,
      handleFieldParam = _ref.handleFieldParam;


  switch (options['type']) {
    case 'date':
      return _react2.default.createElement(
        _reactstrap.FormGroup,
        null,
        _react2.default.createElement(
          _reactstrap.Label,
          { htmlFor: "formControlInput" + itemKey },
          options['label']
        ),
        _react2.default.createElement(_reactstrap.Input, {
          type: options['type'],
          name: item,
          className: 'form-control',
          id: "formControlInput" + itemKey,
          value: data[item] || '',
          required: options['required'],
          readOnly: options['read_only'],
          onChange: handleChange
        })
      );
    case 'string':
      if (options['max_length'] > 250) {
        return _react2.default.createElement(
          _reactstrap.FormGroup,
          { key: itemKey },
          _react2.default.createElement(
            _reactstrap.Label,
            { htmlFor: "formControlInput" + itemKey },
            options['label']
          ),
          _react2.default.createElement('textarea', {
            name: item,
            className: 'form-control',
            id: "formControlInput" + itemKey,
            value: data[item] || '',
            required: options['required'],
            readOnly: options['read_only'],
            onChange: handleChange
          })
        );
      }
      return _react2.default.createElement(
        _reactstrap.FormGroup,
        { key: itemKey },
        _react2.default.createElement(
          _reactstrap.Label,
          { htmlFor: "formControlInput" + itemKey },
          options['label']
        ),
        _react2.default.createElement(_reactstrap.Input, {
          type: options['type'],
          name: item,
          className: 'form-control',
          id: "formControlInput" + itemKey,
          value: data[item] || '',
          required: options['required'],
          readOnly: options['read_only'],
          onChange: handleChange
        })
      );
    case 'integer':
      return _react2.default.createElement(
        _reactstrap.FormGroup,
        { key: itemKey },
        _react2.default.createElement(
          _reactstrap.Label,
          { htmlFor: "formControlInput" + itemKey },
          options['label']
        ),
        _react2.default.createElement(_reactstrap.Input, {
          type: 'number',
          name: item,
          className: 'form-control',
          id: "formControlInput" + itemKey,
          value: data[item] || '',
          required: options['required'],
          readOnly: options['read_only'],
          onChange: handleChange
        })
      );
    case 'float':
      return _react2.default.createElement(
        _reactstrap.FormGroup,
        { key: itemKey },
        _react2.default.createElement(
          _reactstrap.Label,
          { htmlFor: "formControlInput" + itemKey },
          options['label']
        ),
        _react2.default.createElement(_reactstrap.Input, {
          type: 'number',
          step: 'any',
          name: item,
          className: 'form-control',
          id: "formControlInput" + itemKey,
          value: data[item] || '',
          required: options['required'],
          readOnly: options['read_only'],
          onChange: handleChange
        })
      );
    case 'decimal':
      return _react2.default.createElement(
        _reactstrap.FormGroup,
        { key: itemKey },
        _react2.default.createElement(
          _reactstrap.Label,
          { htmlFor: "formControlInput" + itemKey },
          options['label']
        ),
        _react2.default.createElement(_reactstrap.Input, {
          type: 'number',
          step: 'any',
          name: item,
          className: 'form-control',
          id: "formControlInput" + itemKey,
          value: data[item] || '',
          required: options['required'],
          readOnly: options['read_only'],
          onChange: handleChange
        })
      );
    case 'boolean':
      return _react2.default.createElement(
        'div',
        { key: itemKey, className: 'form-check' },
        _react2.default.createElement(_reactstrap.Input, {
          type: 'checkbox',
          name: item,
          className: 'form-check-input',
          id: "formControlInput" + itemKey,
          checked: data[item] || false,
          required: options['required'],
          readOnly: options['read_only'],
          onChange: handleChange
        }),
        _react2.default.createElement(
          _reactstrap.Label,
          { htmlFor: "formControlInput" + itemKey, className: 'form-check-label' },
          options['label']
        )
      );
    case 'field':
      handleFieldParam();
      return _react2.default.createElement(
        _reactstrap.FormGroup,
        { key: itemKey },
        _react2.default.createElement(
          _reactstrap.Label,
          { htmlFor: "formControlInput" + itemKey },
          options['label']
        ),
        _react2.default.createElement('input', {
          type: 'text',
          name: item,
          className: 'form-control',
          id: "formControlInput" + itemKey,
          value: data[item] || '',
          required: options['required'],
          readOnly: true,
          onChange: handleChange
        })
      );
    case 'choice':
      return _react2.default.createElement(
        _reactstrap.FormGroup,
        { key: itemKey },
        _react2.default.createElement(
          _reactstrap.Label,
          { htmlFor: "formControlInput" + itemKey },
          options['label']
        ),
        _react2.default.createElement(
          'select',
          {
            type: 'text',
            name: item,
            className: 'form-control',
            id: "formControlInput" + itemKey,
            value: data[item] || '',
            required: options['required'],
            readOnly: options['read_only'],
            onChange: handleChange
          },
          _react2.default.createElement('option', { value: '', disabled: true }),
          options['choices'].map(function (choice, key) {
            return _react2.default.createElement(
              'option',
              { key: key, value: choice['value'] },
              choice['display_name']
            );
          })
        )
      );
    case 'datetime':
      var localISOTime = data[item];
      if (data[item]) {
        if (data[item].includes('+')) {
          var datetime = new Date(data[item]);
          var tzoffset = datetime.getTimezoneOffset() * 60000; //offset in milliseconds
          localISOTime = new Date(datetime - tzoffset).toISOString().slice(0, -1);
        } else if (data[item].includes('Z')) {
          localISOTime = new Date(data[item]).toISOString().replace('Z', '');
        }
      }
      return _react2.default.createElement(
        _reactstrap.FormGroup,
        { key: itemKey },
        _react2.default.createElement(
          _reactstrap.Label,
          { htmlFor: "formControlInput" + itemKey },
          options['label']
        ),
        _react2.default.createElement(_reactstrap.Input, {
          type: 'datetime-local',
          name: item,
          className: "form-control",
          id: "formControlInput" + itemKey,
          value: localISOTime || '',
          required: options['required'],
          readOnly: options['read_only'],
          onChange: handleChange
        })
      );
    case 'email':
      return _react2.default.createElement(
        _reactstrap.FormGroup,
        { key: itemKey },
        _react2.default.createElement(
          _reactstrap.Label,
          { htmlFor: "formControlInput" + itemKey },
          options['label']
        ),
        _react2.default.createElement(_reactstrap.Input, {
          type: options['type'],
          name: item,
          className: 'form-control',
          id: "formControlInput" + itemKey,
          value: data[item] || '',
          required: options['required'],
          readOnly: options['read_only'],
          onChange: handleChange
        })
      );
    case 'nested object':
      return null;
    default:
      console.log(item, options, data[item]);
      return _react2.default.createElement(
        _reactstrap.FormGroup,
        { key: itemKey },
        _react2.default.createElement(
          _reactstrap.Label,
          { htmlFor: "formControlInput" + itemKey },
          options['label'],
          options['label'],
          ': Could not be rendered'
        )
      );
  }
};

exports.default = FormItem;