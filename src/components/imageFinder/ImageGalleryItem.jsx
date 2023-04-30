import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageFinder.module.css';

import Modal from './Modal';

export default function ImageGalleryItem({
  image: { largeImageURL: largeImage, webformatURL: smallImage },
}) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <li className={css.ImageGalleryItem}>
      {showModal && <Modal image={largeImage} onClose={toggleModal} />}
      <img
        src={smallImage}
        alt=""
        className={css['ImageGalleryItem-image']}
        onClick={toggleModal}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = PropTypes.arrayOf(
  PropTypes.exact({
    id: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  })
);
