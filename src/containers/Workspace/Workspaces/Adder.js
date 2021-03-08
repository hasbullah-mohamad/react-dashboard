import React, { Component } from 'react';
import {
  Card, CardBody, Button, FormGroup, FormFeedback, Input
} from 'reactstrap';
import { withFormik, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

class Adder extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { errors } = this.props;
    return (
      <Card>
        <CardBody>
          <Form>
            <div className="d-flex">
              <div style={{ flex: 1 }} className="mr-2">
                <FormGroup className="mb-0">
                  <Input type="text" name="name" placeholder="Workspace" invalid={!!errors.name} onChange={this.props.handleChange} />
                  { errors.name && <FormFeedback>{errors.name}</FormFeedback>}
                </FormGroup>
              </div>
              <div>
                <Button className="px-0" color="link" type="submit"><i className="fa fa-plus-square-o fa-lg"></i></Button>
              </div>
            </div>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

Adder.propTypes = {
  isAdding: PropTypes.bool,
  data: PropTypes.object,
  onAdd: PropTypes.func
}

Adder.defaultProps = {
  isAdding: false,
  data: {},
  onAdd: () => {}
}

const AdderWithFormik = withFormik({
  mapPropsToValues: ({ name }) => ({
    name: name || ''
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string().required()
  }),
  handleSubmit(values, bags) {
    bags.props.onAdd({
      ...values,
      users: []
    });
  },
  enableReinitialize: true
})(Adder);

AdderWithFormik.propTypes = {
  isAdding: PropTypes.bool,
  data: PropTypes.object,
  onAdd: PropTypes.func
}

AdderWithFormik.defaultProps = {
  isAdding: false,
  data: {},
  onAdd: () => {}
}

export default AdderWithFormik;
