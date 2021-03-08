import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Card, CardBody, CardHeader, CardFooter,
  Form, FormGroup, FormFeedback, Label, Input,
  Row, Col,
  Button
} from 'reactstrap';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Images } from '../../../theme';
import { updateUser } from '../actions';

import ProfilePicture from './profilePicture'

class UserInfo extends Component {
  constructor(props) {
    super(props);
    const src = '';
    this.state = {
      modal: false,
      preview: null,
      src
    }
  }

  handleToggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChangeImage = (preview) => {
    this.setState({preview});
    this.props.setFieldValue('avatar', Images.avatar);
    this.props.setFieldValue('avatarFile', null);
  }
  handleDeleteImage = (e) => {
    this.props.setFieldValue('avatar', Images.avatar);
    this.props.setFieldValue('avatarFile', null);
  }
  handleSubmit = (event) => {
    const { values } = this.props;
    event.preventDefault();
    if(this.state.preview) {
      values.avatar = this.state.preview;
    }
    this.props.handleSubmit(values, this);
  }

  render() {
    const { errors, data, values, handleChange } = this.props;
    return (

        <Form onSubmit={this.handleSubmit}>
          <Card>
            <CardHeader tag="h5" className="bg-light text-uppercase">
              { data.username}
            </CardHeader>
            <CardBody>
              <Row className="flex-column-reverse flex-md-row">
                <Col sm="12" md="7">
                  <FormGroup>
                    <Label>First name</Label>
                    <Input name="firstName" placeholder="First name" value={values.firstName} invalid={errors.firstName} onChange={handleChange} />
                    { errors.firstName && <FormFeedback>{errors.firstName}</FormFeedback>}
                  </FormGroup>
                  <FormGroup>
                    <Label>Last name</Label>
                    <Input name="lastName" placeholder="Last name" value={values.lastName} invalid={errors.lastName} onChange={handleChange}/>
                    { errors.lastName && <FormFeedback>{errors.lastName}</FormFeedback>}
                  </FormGroup>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input type="email" name="email" placeholder="Email" value={values.email} invalid={errors.email} onChange={handleChange}/>
                    { errors.email && <FormFeedback>{errors.email}</FormFeedback>}
                  </FormGroup>
                  <FormGroup>
                    <Label>Mobile Number</Label>
                    <Input type="number" name="phone" placeholder="phone" value={values.phone} onChange={handleChange}/>
                  </FormGroup>
                  <FormGroup>
                    <Label>Bio</Label>
                    <Input type="textarea" name="bio" value={values.bio} onChange={handleChange}/>
                  </FormGroup>
                </Col>
                <Col sm="12" md="5">
                  <ProfilePicture
                    preview={this.state.preview}
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
            </CardBody>
            <CardFooter>
              <Button type="submit" color="primary">Save Profile</Button>
            </CardFooter>
          </Card>
        </Form>
    )
  }
}

const UserInfoWithFormik = withFormik({
  mapPropsToValues: ({ data }) => ({
    id: data.id,
    username: data.username,
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    email: data.email || '',
    phone: data.phone || '',
    bio: data.bio || '',
    // avatar: data.avatar,
    // avatarFile: null,
  }),
  validationSchema: Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().required(),
    phone: Yup.number(),
    bio: Yup.string()
  }),
  handleSubmit(values, bags) {
    bags.props.onUpdateUser(values);
  },
  enableReinitialize: true
})(UserInfo);

UserInfoWithFormik.propTypes = {
  data: PropTypes.object,
}

UserInfoWithFormik.defaultProps = {
  data: {},
}

const mapStateToProps = (state) => ({
  data: state.profile.user
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateUser: bindActionCreators(updateUser, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoWithFormik);
