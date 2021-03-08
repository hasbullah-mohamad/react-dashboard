import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  CardBody,
  CardFooter,
  Button
} from 'reactstrap';

import FormItem from './FormItem'


class FormBody extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormDestroy = this.handleFormDestroy.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFieldParam = this.handleFieldParam.bind(this);
    this.changeNullBlankValues = this.changeNullBlankValues.bind(this);
  }

  componentDidMount() {
    let data = Object.assign({}, this.props.data)

    if (data === {}) {
      data = this.optionToData(this.props.options)
    }

    this.setState({ data })
  }

  static optionToData(options) {
    let data = {};
    if (options && (options.length !== 0)) {
      const items = Object.keys(options);
      for (let item of items) { data[item] = ''; }
    }
    return data
  }

  changeNullBlankValues(value, type) {
    switch(type) {
      case 'number':
        if (value === '') {
          return null
        } else {
          return value
        }
      default:
        return value
    }
  }

  handleFormChange(event) {
    const data = this.state.data;
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    data[name] = this.changeNullBlankValues(value, target.type);
    this.setState({ data });
  }

  handleFieldParam() {
    const { data } = this.state;
    const { name, options } = this.props;
    const { histId } = this.props.match.params;

    if (histId) {
      if (name in options) {
        data[name] = histId;
      } else if ('visitor' in options) {
        // Hack to allow visitor to work for timesheet
        data['visitor'] = histId;
      }
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if (this.props.match.params.id === 'add') {
       this.props.handleCreate(this.state.data)
    } else {
      this.props.handleUpdate(this.state.data)
    }
  }

  handleFormDestroy(event) {
    event.preventDefault();
    if (this.props.match.params.id !== 'add') {
      if (window.confirm('Are you sure you want to delete this record?')) {
        this.props.handleDestroy(this.state.data)
      }
    }
  }

  render() {
    const { data } = this.state;
    const { options } = this.props;

    if (!options) return <div>No data</div>
    if (options.length === 0) return <div>No data</div>

    const items = Object.keys(options);

    return (
      <React.Fragment>
        <CardBody>
        {
          items.map((item, key) => {
            return (
              <FormItem
                key={key}
                item={item}
                itemKey={key}
                data={data}
                options={options[item]}
                handleChange={this.handleFormChange}
                handleFieldParam={this.handleFieldParam}
              />
            )
          })
        }
        </CardBody>
        <CardFooter>
          <Button
            type="submit"
            size="sm"
            color="primary"
            onClick={this.handleFormSubmit}
          ><i className="fa fa-dot-circle-o"></i> Submit</Button>
          <Button
            type="reset"
            size="sm"
            color="danger"
            className="float-right"
            onClick={this.handleFormDestroy}
          ><i className="fa fa-ban"></i> Delete</Button>
        </CardFooter>
      </React.Fragment>
    )
  }
}

export default withRouter(FormBody);
