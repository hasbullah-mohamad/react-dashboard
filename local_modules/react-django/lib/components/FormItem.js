import React from 'react';
import {
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

const FormItem = ({itemKey, item, data, options, handleChange, handleFieldParam}) => {

  switch (options['type']) {
    case 'date':
      return (
        <FormGroup>
          <Label htmlFor={"formControlInput"+itemKey}>{options['label']}</Label>
          <Input
            type={options['type']}
            name={item}
            className="form-control"
            id={"formControlInput"+itemKey}
            value={data[item] || ''}
            required={options['required']}
            readOnly={options['read_only']}
            onChange={handleChange}
          />
        </FormGroup>
      );
    case 'string':
      if (options['max_length'] > 250) {
        return (
          <FormGroup key={itemKey}>
            <Label htmlFor={"formControlInput"+itemKey}>{options['label']}</Label>
            <textarea
              name={item}
              className="form-control"
              id={"formControlInput"+itemKey}
              value={data[item] || ''}
              required={options['required']}
              readOnly={options['read_only']}
              onChange={handleChange}
            />
          </FormGroup>
        );
      }
      return (
        <FormGroup key={itemKey}>
          <Label htmlFor={"formControlInput"+itemKey}>{options['label']}</Label>
          <Input
            type={options['type']}
            name={item}
            className="form-control"
            id={"formControlInput"+itemKey}
            value={data[item] || ''}
            required={options['required']}
            readOnly={options['read_only']}
            onChange={handleChange}
          />
        </FormGroup>
      );
    case 'integer':
      return (
        <FormGroup key={itemKey}>
          <Label htmlFor={"formControlInput"+itemKey}>{options['label']}</Label>
          <Input
            type='number'
            name={item}
            className="form-control"
            id={"formControlInput"+itemKey}
            value={data[item] || ''}
            required={options['required']}
            readOnly={options['read_only']}
            onChange={handleChange}
          />
        </FormGroup>
      );
    case 'float':
      return (
        <FormGroup key={itemKey}>
          <Label htmlFor={"formControlInput"+itemKey}>{options['label']}</Label>
          <Input
            type='number'
            step='any'
            name={item}
            className="form-control"
            id={"formControlInput"+itemKey}
            value={data[item] || ''}
            required={options['required']}
            readOnly={options['read_only']}
            onChange={handleChange}
          />
        </FormGroup>
      );
    case 'decimal':
      return (
        <FormGroup key={itemKey}>
          <Label htmlFor={"formControlInput"+itemKey}>{options['label']}</Label>
          <Input
            type='number'
            step='any'
            name={item}
            className="form-control"
            id={"formControlInput"+itemKey}
            value={data[item] || ''}
            required={options['required']}
            readOnly={options['read_only']}
            onChange={handleChange}
          />
        </FormGroup>
      );
    case 'boolean':
      return (
        <div key={itemKey} className="form-check">
          <Input
            type='checkbox'
            name={item}
            className="form-check-input"
            id={"formControlInput"+itemKey}
            checked={data[item] || false}
            required={options['required']}
            readOnly={options['read_only']}
            onChange={handleChange}
          />
          <Label htmlFor={"formControlInput"+itemKey} className="form-check-label">{options['label']}</Label>
        </div>
      );
    case 'field':
      handleFieldParam();
      return (
        <FormGroup key={itemKey}>
          <Label htmlFor={"formControlInput"+itemKey}>{options['label']}</Label>
          <input
            type="text"
            name={item}
            className="form-control"
            id={"formControlInput"+itemKey}
            value={data[item] || ''}
            required={options['required']}
            readOnly={true}
            onChange={handleChange}
          />
        </FormGroup>
      );
    case 'choice':
      return (
        <FormGroup key={itemKey} >
          <Label htmlFor={"formControlInput"+itemKey}>{options['label']}</Label>
          <select
            type="text"
            name={item}
            className="form-control"
            id={"formControlInput"+itemKey}
            value={data[item] || ''}
            required={options['required']}
            readOnly={options['read_only']}
            onChange={handleChange}
          >
            <option value="" disabled></option>
          {
            options['choices'].map((choice, key) => {
              return <option key={key} value={choice['value']}>{choice['display_name']}</option>
            })
          }
          </select>
        </FormGroup>
      );
    case 'datetime':
      let localISOTime = data[item];
      if (data[item]) {
        if (data[item].includes('+')) {
          const datetime = new Date(data[item])
          const tzoffset = datetime.getTimezoneOffset() * 60000; //offset in milliseconds
          localISOTime = (new Date(datetime - tzoffset)).toISOString().slice(0, -1);
        } else if (data[item].includes('Z')) {
          localISOTime = (new Date(data[item]).toISOString()).replace('Z', '');
        }
      }
      return (
        <FormGroup key={itemKey} >
          <Label htmlFor={"formControlInput"+itemKey}>{options['label']}</Label>
          <Input
            type="datetime-local"
            name={item}
            className={"form-control" }
            id={"formControlInput"+itemKey}
            value={localISOTime || ''}
            required={options['required']}
            readOnly={options['read_only']}
            onChange={handleChange}
          />
        </FormGroup>
      );
    case 'email':
      return (
        <FormGroup key={itemKey} >
          <Label htmlFor={"formControlInput"+itemKey}>{options['label']}</Label>
          <Input
            type={options['type']}
            name={item}
            className="form-control"
            id={"formControlInput"+itemKey}
            value={data[item] || ''}
            required={options['required']}
            readOnly={options['read_only']}
            onChange={handleChange}
          />
        </FormGroup>
      );
    case 'nested object':
      return null;
    default:
      console.log(item, options, data[item])
      return (
        <FormGroup key={itemKey} >
          <Label htmlFor={"formControlInput"+itemKey}>{options['label']}{options['label']}: Could not be rendered</Label>
        </FormGroup>
      );
  }
}

export default FormItem
