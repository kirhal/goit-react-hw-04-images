import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageFinder.module.css';

import Modal from './Modal';

export default class ImageGalleryItem extends Component {
  state = {
    smallImage: this.props.image.webformatURL,
    largeImage: this.props.image.largeImageURL,
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { smallImage, largeImage, showModal } = this.state;
    return (
      <li className={css.ImageGalleryItem}>
        {showModal && <Modal image={largeImage} onClose={this.toggleModal} />}
        <img
          src={smallImage}
          alt=""
          className={css['ImageGalleryItem-image']}
          onClick={this.toggleModal}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = PropTypes.arrayOf(
  PropTypes.exact({
    id: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  })
);
