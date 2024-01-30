import { fetchBreeds, fetchCatByBreed } from './cat-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SlimSelect from 'slim-select';

const refs = {
  selectEl: document.querySelector('.breed-select'),
  infoEl: document.querySelector('.cat-info'),
  loaderEl: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
  optionEl: document.querySelector('option[value = "default"]'),
};

hideLoader();
getBreeds();

refs.selectEl.addEventListener('change', handleSelect);

function getBreeds() {
  showLoader();
  return fetchBreeds()
    .then(breeds => {
      refs.selectEl.insertAdjacentHTML(
        'beforeend',
        createSelectOptions(breeds.data)
      );
      prettySelect();
    })
    .catch(() => {
      showErrorMessage();
    })
    .finally(() => {
      hideLoader();
    });
}
function getCatById(breedId) {
  showLoader();
  fetchCatByBreed(breedId)
    .then(breeds => {
      if (!breeds.data.length) {
        showErrorMessage();
      }
      refs.infoEl.insertAdjacentHTML(
        'afterbegin',
        createMarkUpInfo(breeds.data)
      );
    })
    .catch(() => {
      showErrorMessage();
    })
    .finally(() => {
      hideLoader();
    });
}
function handleSelect(e) {
  refs.infoEl.innerHTML = '';
  getCatById(e.target.value);
}
function createSelectOptions(arr) {
  return arr
    .map(({ id, name }) => `<option value=${id}>${name}</option>`)
    .join('');
}
function createMarkUpInfo(arr) {
  return arr
    .map(
      ({
        breeds: [{ name, description, temperament }],
        url,
      }) => `  <img src="${url}" alt="${name}" class="cat-image">
    <div class="cat-about">
  <h2>${name}</h2>
  <p class="cat-description">${description}</p>
  <p class="cat-temperament"><span class="temperament">Temperament: </span>${temperament}</p>
  </div>`
    )
    .join('');
}
function showLoader() {
  refs.loaderEl.hidden = false;
}
function hideLoader() {
  refs.loaderEl.hidden = true;
}
function showErrorMessage() {
  iziToast.error({
    title: 'Error',
    message: 'Oops! Something went wrong! Try reloading the page!',
    position: 'topCenter',
  });
}
function prettySelect() {
  new SlimSelect({
    select: '.breed-select',
    settings: {
      placeholderText: 'Choose cat',
    },
  });
}
