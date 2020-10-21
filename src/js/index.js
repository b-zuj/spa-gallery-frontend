import axios from 'axios';

import '../styles/styles.scss';
import {
  searchInput, form, paginationBtns, main, ul, pageCounter, spinnerContainer,
} from './selectors';
import { inputChangeHandler, createSuggestionsList, handleStorage } from './search';
import htmlBuilder from './htmlBuilder';

const baseUrl = 'https://salt-spa-gallery.herokuapp.com/api/unsplash';
let query = '';
let page = 1;

const cleanerFailure = () => {
  spinnerContainer.innerHTML = `<p class="error">No images for: <strong>${query}</strong></</p>`;
  main.innerHTML = '';
  paginationBtns.forEach(btn => {
    btn.style.display = 'none';
  });
  pageCounter.style.display = 'none';
  page = 1;
  searchInput.value = '';
};

const loader = '<div class="loader">Loading...</div>';

const fetcher = async (queryString, pageNumber) => {
  spinnerContainer.innerHTML = loader;
  const pagination = pageNumber ? `&page=${pageNumber}` : '';
  const data = await axios.get(`${baseUrl}?query=${queryString}&per_page=10${pagination}`);
  spinnerContainer.innerHTML = '';
  if (data.data.results.length < 1) {
    return cleanerFailure();
  }
  return data;
};

const pageCounterHandler = (pageNumber, el) => {
  el.textContent = pageNumber;
};

// initial load of localStorage values for search
const localStorageSearch = localStorage.getItem('search');
const searchArr = localStorageSearch ? localStorageSearch.split(',') : [];

// build cards and clean localStorage
const searchAndDisplay = async (e, pageNumber) => {
  if (e) {
    e.preventDefault();
  }
  query = searchInput.value ? searchInput.value : query;
  try {
    const data = await fetcher(query, pageNumber);
    htmlBuilder(data.data.results, main);
    paginationBtns.forEach(btn => {
      btn.style.display = 'block';
    });
    pageCounter.style.display = 'block';
  } catch (error) {
    cleanerFailure();
  }
};

// form listener
form.addEventListener('submit', e => {
  searchAndDisplay(e);
  handleStorage(query, searchArr);
  pageCounterHandler(page, pageCounter);
  page = 1;
});

// Pagination
paginationBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.textContent === 'prev' && page > 1) {
      searchAndDisplay(null, page - 1);
      page -= 1;
      pageCounterHandler(page, pageCounter);
    }

    if (btn.textContent === 'prev' && page === 1) {
      btn.setAttribute('disabled', 'true');
    }
    if (btn.textContent === 'next') {
      searchAndDisplay(null, page + 1);
      page += 1;
      paginationBtns[0].removeAttribute('disabled');
      pageCounterHandler(page, pageCounter);
    }
  });
});

// listeners  for Input
searchInput.addEventListener('focusin', () => {
  createSuggestionsList(searchArr);
});

// clean search suggests on focusout
window.addEventListener('click', e => {
  if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'FORM' && e.target.tagName !== 'UL' && e.target.tagName !== 'LI') {
    ul.innerHTML = '';
  }
});

searchInput.addEventListener('input', e => {
  inputChangeHandler(searchArr, e);
});
