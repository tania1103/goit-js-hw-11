
import axios from 'axios';

const API_KEY = '47184305-f46e894b64efb95e412de1c30';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page, perPage) => {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: perPage,
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data;
};
