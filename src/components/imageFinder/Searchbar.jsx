import PropTypes from 'prop-types';
import css from './ImageFinder.module.css';

export default function Searchbar({ onSubmit }) {
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={css['SearchForm-button']}>
          {/* <span className={css['SearchForm-button-label']}></span> */}
        </button>
        <input
          className={css['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="input"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
