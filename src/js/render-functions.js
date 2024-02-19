import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function createGallery(images, galleryElement) {
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
  galleryElement.insertAdjacentHTML('beforeend', galleryHTML);
  new SimpleLightbox('.gallery-link');
}
