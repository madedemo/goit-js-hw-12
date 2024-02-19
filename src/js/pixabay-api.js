import axios from 'axios';

export async function getPhotos(searchTerm, page) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '42200022-9c7e7676f0f903944c054771a',
        q: searchTerm,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: page,
      },
    });
    return response.data.hits;
  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
}
