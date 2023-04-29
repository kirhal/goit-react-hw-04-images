import { Component } from 'react';
import { fetchImages } from '../instruments/fetchAPI';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './App.module.css';

import Searchbar from './imageFinder/Searchbar';
import ImageGallery from './imageFinder/ImageGallery';
import Button from './imageFinder/Button';
import Loader from './imageFinder/Loader';

Notify.init({
  fontSize: '20px',
  width: '570px',
  position: 'center-top',
  cssAnimationDuration: 400,
  cssAnimationStyle: 'zoom',
  timeout: 1500,
});

export class App extends Component {
  state = {
    searchValue: '',
    images: [],
    isLoading: false,
    error: null,
    page: 0,
    totalHits: 0,
  };

  async componentDidUpdate(_, prevState) {
    const { searchValue, page } = this.state;
    if (prevState.searchValue !== searchValue || prevState.page !== page) {
      this.fetchData(searchValue, page);
    }
  }

  fetchData = async (searchValue, page) => {
    try {
      this.setState({ isLoading: true });
      const data = await fetchImages(searchValue, page);
      if (data.hits.length === 0) {
        this.setState({ error: 'No results' });
      }
      const imagesArr = data.hits.map(
        ({ id, webformatURL, largeImageURL }) => ({
          id,
          webformatURL,
          largeImageURL,
        })
      );
      this.setState(({ images }) => ({
        images: [...images, ...imagesArr],
        totalHits: data.totalHits,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onSubmit = e => {
    const { searchValue } = this.state;
    e.preventDefault();
    const form = e.currentTarget;
    const inputValue = form.elements.input.value.trim().toLowerCase();
    if (inputValue.length === 0) {
      Notify.failure(`❌ Write request in the searchbar`);
      return;
    } else if (inputValue === searchValue) {
      Notify.info(`Try another search word or click 'Load more' button`);
      return;
    } else this.setState({ searchValue: inputValue, page: 1, images: [] });
  };

  onClick = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  render() {
    const { images, isLoading, error, totalHits } = this.state;
    const result = totalHits - images.length;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
        {error && <h1>{error}</h1>}
        {images.length > 0 && <ImageGallery images={images} />}
        {isLoading && <Loader />}
        {result !== 0 && !isLoading && images.length !== 0 && (
          <Button onClick={this.onClick} />
        )}
      </div>
    );
  }
}
