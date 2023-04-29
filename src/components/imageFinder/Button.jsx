import PropTypes from 'prop-types';
import css from './ImageFinder.module.css';

export default function Button({ onClick }) {
  return (
    <button type="button" className={css.Button} onClick={onClick}>
      Load more
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
