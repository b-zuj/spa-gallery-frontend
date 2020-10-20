import '../styles/main.scss';
import { autocomplete } from './autocomplete';
import htmlBuilder from './htmlBuilder';

const key = process.env.ACCESS_KEY; // key to api

const searchInput = document.querySelector('#search');
const form = document.querySelector('#form');
const navBtns = document.querySelectorAll('.navBtn');
const main = document.querySelector('#main');

let query = '';
let page = 1;

const fetcher = (queryString, pageNumber) => {
  const pagination = pageNumber ? `&page=${pageNumber}` : '';
  fetch(`https://api.unsplash.com/search/photos/?query=${queryString}&client_id=${key}&per_page=10${pagination}`)
    .then(res => res.json())
    .then(data => {
      htmlBuilder(data.results, main);
    });
};

const localStorageSearch = localStorage.getItem('search');
let searchArr = localStorageSearch ? localStorageSearch.split(',') : [];

const handleStorage = queryString => {
  searchArr.push(queryString);
  searchArr = [...new Set(searchArr)];
  searchInput.value = '';
  localStorage.setItem('search', searchArr);
};

const search = (e, pageNumber) => {
  if (e) {
    e.preventDefault();
  }
  query = searchInput.value ? searchInput.value : query;
  fetcher(query, pageNumber);
  handleStorage(query);
};

form.addEventListener('submit', e => {
  search(e);
});

// Pagination
navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.textContent === 'prev' && page > 1) {
      search(null, page - 1);
      page -= 1;
    }
    if (btn.textContent === 'next') {
      search(null, page + 1);
      page += 1;
    }
  });
});

searchInput.addEventListener('focus', () => {
  autocomplete(searchInput, searchArr);
});
