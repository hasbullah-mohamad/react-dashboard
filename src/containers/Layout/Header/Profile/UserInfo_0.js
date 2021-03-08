import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  DropdownMenu, DropdownToggle,
  Card, CardBody, CardHeader, CardFooter,
  Form, FormGroup, FormFeedback, Label, Input,
  Row, Col,
  Button
} from 'reactstrap';
import { withFormik } from 'formik';
import Yup from 'yup';
import PropTypes from 'prop-types';
import { AppHeaderDropdown } from '@coreui/react';
import { Images } from '../../../../theme';
import { updateUser } from '../../../Profile/actions';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    }
  }
  handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    const img = new Image();
    img.src = window.URL.createObjectURL( file );
    img.onload = function() {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      window.URL.revokeObjectURL( img.src );
      if(width < 180 && height < 180) {
        window.alert('Image must be greater than 180x180');
        return;
      }
      if( width !== height ) {
        window.alert('Please input square image.');
        return;
      }
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => {
      this.props.setFieldValue('avatar', reader.result);
      this.props.setFieldValue('avatarFile', file);
    }
  }

  handleTriggerImage = (e) => {
    this.imageFileRef.click();
  }
  handleDeleteImage = (e) => {
    this.props.setFieldValue('avatar', Images.avatar);
    this.props.setFieldValue('avatarFile', null);
  }
  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleSubmit = (event) => {
    const { values } = this.props;
    event.preventDefault();
    this.props.handleSubmit(values, this);
    setTimeout(() => {
      this.toggle();
    }, 1000);
  }

  handleCancel = (event) => {
    this.toggle();
    this.props.setValues({
      ...this.props.data
    });
  }
  render() {
    const { errors, data, values, handleChange } = this.props;
    return (
      <AppHeaderDropdown direction="down" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
      <DropdownToggle nav>
        <img src={data.avatar} className="img-avatar" alt={data.username}/>
      </DropdownToggle>
      <DropdownMenu>
        <div className="profile--user-info">
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
                      <Input name="firstname" placeholder="First name" value={values.firstname} invalid={errors.firstname} onChange={handleChange} />
                      { errors.firstname && <FormFeedback>{errors.firstname}</FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                      <Label>Last name</Label>
                      <Input name="lastname" placeholder="Last name" value={values.lastname} invalid={errors.lastname} onChange={handleChange}/>
                      { errors.lastname && <FormFeedback>{errors.lastname}</FormFeedback>}
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
                      <Label>Description</Label>
                      <Input type="textarea" name="description" value={values.description} onChange={handleChange}/>
                    </FormGroup>
                  </Col>
                  <Col sm="12" md="5">
                    <div className="mx-auto mb-4" style={{ maxWidth: '180px' }}>
                      <img src={values.avatar} className="img-avatar" alt={data.username}/>
                    </div>
                    <FormGroup>
                      <input className="d-none"
                        ref={(ref) => { this.imageFileRef = ref; } }
                        type="file"
                        name="imageUrl"
                        onChange={this.handleImageChange} />
                      <div className="text-center">
                        <Button type="button" onClick={this.handleTriggerImage} color="link" size="sm"><i className="fa fa-lg fa-edit"></i></Button>
                        {
                          values.avatarFile && (
                            <Button type="button" onClick={this.handleDeleteImage} color="link" size="sm"><i className="fa fa-lg fa-trash"></i></Button>
                          )
                        }
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button type="submit" color="light">Save Profile</Button>
                <Button type="button" color="danger" className="float-right" onClick={this.handleCancel}>Cancel</Button>
              </CardFooter>
            </Card>
          </Form>
        </div>
      </DropdownMenu>
    </AppHeaderDropdown>
    )
  }
}

const UserInfoWithFormik = withFormik({
  mapPropsToValues: ({ data }) => ({
    username: data.username,
    firstname: data.firstname || '',
    lastname: data.lastname || '',
    email: data.email || '',
    phone: data.phone || '',
    description: data.description || '',
    avatar: data.avatar,
    avatarFile: null,
  }),
  validationSchema: Yup.object().shape({
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
    email: Yup.string().required(),
    phone: Yup.number(),
    description: Yup.string()
  }),
  handleSubmit(values, bags) {
    bags.props.updateUser(values);
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
  updateUser: bindActionCreators(updateUser, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoWithFormik);
