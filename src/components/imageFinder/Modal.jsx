import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageFinder.module.css';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={css.Overlay} onClick={this.handleBackdrop}>
        <div className={css.Modal}>
          <img src={this.props.image} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
