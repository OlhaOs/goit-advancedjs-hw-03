import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_48axi5ap0mnf8pbuq3A2Wnqk4fdJxwpKcxjaPvMpfdw76beol8PrOua3fveDqqkt';

const BASE_URL = 'https://api.thecatapi.com/v1/';
const SEARCH_BY_ID = 'images/search?breed_ids=';

export function fetchBreeds() {
  return axios.get(`${BASE_URL}breeds`);
}

export function fetchCatByBreed(breedId) {
  return axios.get(`${BASE_URL}${SEARCH_BY_ID}${breedId}`);
}
