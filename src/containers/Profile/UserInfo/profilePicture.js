import React from 'react';
import Avatar from 'react-avatar-edit';
import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button,
} from 'reactstrap';

import { Images } from '../../../theme';

class profilePicture extends React.Component {

  state = {
    newPreview: null,
  }

  handleSavePicture = () => {
    const {
      newPreview = Images.avatar
    } = this.state;
    this.props.onChangeImage(newPreview);
    this.props.onToggle();
  }

  handleChangePicture = (newPreview) => {
    this.setState({ newPreview });
  }

  render() {
    const {
      preview,
      data,
      values,
      modal,
      onToggle,
      onDeleteImage,
      src,
    } = this.props;

    return (
      <div>
        <div className="mx-auto mb-4" style={{ maxWidth: '180px', textAlign: "center" }} >
          {preview ?
            <img src={preview} className="img-avatar img-profile" alt={data.username}/>
            :
            <img src={values.avatar} className="img-avatar img-profile" alt={data.username}/>
          }
          <a href="#nolink" onClick={onToggle}>Click to edit</a>
        </div>

        <Modal isOpen={modal} toggle={onToggle}>
          <ModalHeader toggle={onToggle}>Update Profile Picture</ModalHeader>
          <ModalBody style={{ alignSelf: "center" }}>
            <Avatar
              width={180}
              height={180}
              imageWidth={350}
              onClose={onDeleteImage}
              onCrop={this.handleChangePicture}
              src={src}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" onClick={this.handleSavePicture}>Save</Button>{' '}
            <Button color="secondary" onClick={onToggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default profilePicture;
