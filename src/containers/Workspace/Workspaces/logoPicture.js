import React from 'react';
import Avatar from 'react-avatar-edit';
import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button,
} from 'reactstrap';

import { Images } from '../../../theme';

class logoPicture extends React.Component {

  state = {
    newPreviewlogo: null,
  }

  handleSaveLogo = () => {
    const {
      newPreviewlogo = Images.logo
    } = this.state;
    this.props.onChangeImage(newPreviewlogo);
    this.props.onToggle();
  }

  handleChangeLogo = (newPreviewlogo) => {
    this.setState({ newPreviewlogo });
  }

  render() {
    const {
      previewlogo,
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
          {previewlogo ?
            <img src={previewlogo} className="img-profile" alt={data.username}/>
            :
            <img src={values.logo} className="img-profile" alt={data.username}/>
          }
          <a href="#nolink" onClick={onToggle}>Click to edit</a>
        </div>

        <Modal isOpen={modal} toggle={onToggle}>
          <ModalHeader toggle={onToggle}>Update Settings Logo</ModalHeader>
          <ModalBody style={{ alignSelf: "center" }}>
            <Avatar
              width={180}
              height={180}
              imageWidth={350}
              lineWidth={1}
              onClose={onDeleteImage}
              onCrop={this.handleChangeLogo}
              src={src}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" onClick={this.handleSaveLogo}>Save</Button>{' '}
            <Button color="secondary" onClick={onToggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default logoPicture;