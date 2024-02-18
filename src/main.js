import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');
let currentPage = 1;
let searchTerm = '';

loader.style.display = 'none';
loadMoreBtn.style.display = 'none';

form.addEventListener('submit', async e => {
  e.preventDefault();
  loader.style.display = 'block';
  searchTerm = e.target.elements.input.value;
  currentPage = 1; // reset page number on new search
  await getPhotos(searchTerm, currentPage);
  e.target.reset();
});

loadMoreBtn.addEventListener('click', async () => {
  loader.style.display = 'block';
  currentPage++;
  await getPhotos(searchTerm, currentPage);
});

async function getPhotos(searchTerm, page) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '42200022-9c7e7676f0f903944c054771a',
        q: searchTerm,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15, // 15 images per page
        page: page,
      },
    });
    const { data } = response;
    createGallery(data.hits);
    const totalHits = data.totalHits;
    if (totalHits <= page * 15) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      loadMoreBtn.style.display = 'block';
    }
    smoothScroll();
  } catch (error) {
    console.error('Error fetching photos:', error);
  } finally {
    loader.style.display = 'none';
  }
}

function createGallery(images) {
  const galleryHTML = images
    .map(
      image => `
      <a class="gallery-link" href="${image.largeImageURL}">
  <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" />
  <div class="img-content">
    <div>
      <h3>Likes</h3>
      <p>${image.likes}</p>
    </div>
    <div>
      <h3>Views</h3>
      <p>${image.views}</p>
    </div>
    <div>
      <h3>Comments</h3>
      <p>${image.comments}</p>
    </div>
    <div>
      <h3>Downloads</h3>
      <p>${image.downloads}</p>
    </div>
  </div>
</a>
    `
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', galleryHTML);
  new SimpleLightbox('.gallery-link');
}

function smoothScroll() {
  const cardHeight = document
    .querySelector('.gallery-link')
    .getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
