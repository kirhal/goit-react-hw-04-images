import axios from 'axios';

const key = '34322240-24f2606f1746f3f062e0e7b7b';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (searchValue, page) => {
  const requestParams = `?key=${key}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`;
  const response = await axios.get(`${BASE_URL}${requestParams}`);
  return response.data;
};
