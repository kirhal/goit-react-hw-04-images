import PropTypes from 'prop-types';
import css from './ImageFinder.module.css';

import ImageGalleryItem from './ImageGalleryItem';

export default function ImageGallery({ images }) {
  return (
    <ul className={css.ImageGallery}>
      {images.map(image => {
        return <ImageGalleryItem image={image} key={image.id} />;
      })}
    </ul>
  );
}

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.exact({
        id: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
      })
    )
  ),
};
