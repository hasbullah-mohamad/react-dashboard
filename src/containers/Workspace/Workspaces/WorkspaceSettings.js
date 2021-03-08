import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Form, FormGroup, FormFeedback, Label, Input,
  Row, Col,
  Button
} from 'reactstrap';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Images } from '../../../theme';
import { deleteWorkspace } from '../actions';
import { updateWorkspace } from '../actions';

import LogoPicture from './logoPicture'

class WorkspaceSettings extends Component {
  constructor(props) {
    super(props);
    const src = '';
    this.state = {
      modal: false,
      previewlogo: null,
      src
    }
  }

  handleToggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChangeImage = (previewlogo) => {
    this.setState({previewlogo});
    this.props.setFieldValue('logo', Images.logo);
    this.props.setFieldValue('logoFile', null);
  }
  handleDeleteImage = (e) => {
    this.props.setFieldValue('logo', Images.logo);
    this.props.setFieldValue('logoFile', null);
  }
  componentWillReceiveProps(props) {
    this.setState({
      data: props.data,
      imagePreviewUrl: props.data.logo
    });
  }
  handleSubmit = (event) => {
    const { values } = this.props;
    event.preventDefault();
    if(this.state.previewlogo) {
      values.logo = this.state.previewlogo;
    }
    this.props.handleSubmit(values, this);
  }
  render() {
    const { errors, data, values, handleChange } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row className="flex-column-reverse flex-md-row">
          <Col sm="12" md="7">
            <FormGroup>
              <Label>Name</Label>
              <Input type="text" name="name" value={values.name} invalid={errors.name} onChange={handleChange} />
              { errors.name && <FormFeedback>{errors.name}</FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label>Description</Label>
              <Input type="textarea" name="description" value={values.description} onChange={handleChange}/>
            </FormGroup>
          </Col>
          <Col sm="12" md="5">
            <LogoPicture
              previewlogo={this.state.previewlogo}
              data={data}
              values={values}
              modal={this.state.modal}
              onToggle={this.handleToggle}
              onChangeImage={this.handleChangeImage}
              onDeleteImage={this.handleDeleteImage}
              src={this.state.src}
            />
          </Col>
        </Row>
        <Button type="submit" color="primary">Save Settings</Button>
        <Button color="danger" className="pull-right" onClick={this.handleDeleteWorkspace}>Delete Workspace</Button>
      </Form>
    )
  }
}

const WorkspaceInfoWithFormik = withFormik({
  mapPropsToValues: ({ data }) => ({
    id: data.id,
    name: data.name || '',
    description: data.description || '',
    logo: data.logo,
    icon: data.icon,
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string(),
    address: Yup.string(),
  }),
  handleSubmit(values, bags) {
    bags.props.onUpdateWorkspace(values);
  },
  enableReinitialize: true
})(WorkspaceSettings);

WorkspaceInfoWithFormik.propTypes = {
  data: PropTypes.object,
}

WorkspaceInfoWithFormik.defaultProps = {
  data: {},
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  onDeleteWorkspace: bindActionCreators(deleteWorkspace, dispatch),
  onUpdateWorkspace: bindActionCreators(updateWorkspace, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceInfoWithFormik);
