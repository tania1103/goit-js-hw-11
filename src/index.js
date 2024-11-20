import './css/styles.css';
import { fetchImages } from './js/apiService';
import { renderGallery, clearGallery } from './js/galleryMarkup';
import { showSuccessNotification, showErrorNotification, showEndOfResults } from './js/notifications';
import throttle from 'lodash.throttle';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

let query = '';
let page = 1;
let lightbox;
const perPage = 40;
let totalHits = 0;

// Form submit handler
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  query = e.target.elements.searchQuery.value.trim();

  if (!query) {
    showErrorNotification('Please enter a search query.');
    return;
  }

  page = 1;
  clearGallery();

  try {
    const data = await fetchImages(query, page, perPage);
    totalHits = data.totalHits;

    if (totalHits === 0) {
      showErrorNotification('No images found. Please try a different query.');
      return;
    }

    showSuccessNotification(`Hooray! We found ${totalHits} images.`);
    renderGallery(data.hits);
    lightbox = new SimpleLightbox('.gallery a').refresh();

    if (data.hits.length === perPage) {
      addInfiniteScroll();
    }
  } catch (error) {
    showErrorNotification('An error occurred. Please try again later.');
  }
});

// Infinite scrolling
function addInfiniteScroll() {
  window.addEventListener('scroll', throttle(onScroll, 300));
}

async function onScroll() {
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200) {
    page += 1;

    try {
      const data = await fetchImages(query, page, perPage);

      if (data.hits.length === 0) {
        showEndOfResults('You have reached the end of search results.');
        window.removeEventListener('scroll', onScroll);
        return;
      }

      renderGallery(data.hits);
      lightbox.refresh();
    } catch (error) {
      showErrorNotification('An error occurred. Please try again later.');
    }
  }
}
