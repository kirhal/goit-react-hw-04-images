import { useState, useEffect } from 'react';
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

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (searchValue && page) {
      fetchData(searchValue, page);
    }
  }, [searchValue, page]);

  const fetchData = async (searchValue, page) => {
    try {
      setIsLoading(true);
      const data = await fetchImages(searchValue, page);
      if (data.hits.length === 0) {
        setError('No results');
      }
      const imagesArr = data.hits.map(
        ({ id, webformatURL, largeImageURL }) => ({
          id,
          webformatURL,
          largeImageURL,
        })
      );
      setImages(prev => [...prev, ...imagesArr]);
      setTotalHits(data.totalHits);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const inputValue = form.elements.input.value.trim().toLowerCase();
    if (inputValue.length === 0) {
      Notify.failure(`❌ Write request in the searchbar`);
      return;
    } else if (inputValue === searchValue) {
      Notify.info(`Try another search word or click 'Load more' button`);
      return;
    } else {
      setSearchValue(inputValue);
      setPage(1);
      setImages([]);
    }
  };

  const onClick = () => {
    setPage(prev => prev + 1);
  };

  const result = totalHits - images.length;

  return (
    <div className={css.App}>
      <Searchbar onSubmit={onSubmit} />
      {error && <h1>{error}</h1>}
      {images.length > 0 && <ImageGallery images={images} />}
      {isLoading && <Loader />}
      {result !== 0 && !isLoading && images.length !== 0 && (
        <Button onClick={onClick} />
      )}
    </div>
  );
}
