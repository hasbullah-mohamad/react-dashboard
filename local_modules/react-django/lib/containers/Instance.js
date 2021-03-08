import React, { Component } from 'react';
import { Card, CardHeader } from 'reactstrap';
import { FormBody } from '../components';


class Instance extends Component {
  constructor() {
    super();
    this.state = {
      instance: '',
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    if (this.props.options) {
    } else {
      this.props.handleFetchOptions()
    }

    if (id === 'add') {
      this.setState({ instance: {} })
    } else {
      this.props.handleFetchInstance()
      .then((instance) => {
        this.setState({ instance })
      })
    }
    
  }

  render() {
    const { data, match, options, title, ...rest } = this.props;
    const { instance } = this.state;

    if (!instance) {
      return <div>Loading...</div>
    }

    const undefinedObject = (obj) => (typeof(obj) === 'undefined')
    const emptyOject = (obj) => (Object.keys(obj).length === 0 && obj.constructor === Object)

    if (undefinedObject(options) || emptyOject(options)) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Card>
          <CardHeader>
            { title || options.name }
          </CardHeader>

          <FormBody data={instance} options={options.actions.POST} {...rest} />

        </Card>
      </div>
    )
  }

}

export default Instance
