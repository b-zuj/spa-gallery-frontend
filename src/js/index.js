import '../styles/main.scss';
import { autocomplete } from './autocomplete'
import { htmlBuilder } from './htmlBuilder'

const key = process.env.ACCESS_KEY // key to api

const searchInput = document.querySelector('#search')
const form = document.querySelector('#form')
const navBtns = document.querySelectorAll('.navBtn')

let query = ''
let page = 1;

const fetcher = (query, page) => {
  const pagination = page ? `&page=${page}` : ""
  // console.log(`https://api.unsplash.com/search/photos/?query=${query}&client_id=${key}&per_page=10${pagination}`)
  fetch(`https://api.unsplash.com/search/photos/?query=${query}&client_id=${key}&per_page=10${pagination}`)
    .then(res => res.json())
    .then(data => {
      htmlBuilder(data.results)
    })

}

const localStorageSearch = localStorage.getItem('search')
let searchArr = localStorageSearch ? localStorageSearch.split(',') : []

const handleStorage = (query) => {
  searchArr.push(query)
  searchArr = [...new Set(searchArr)]
  searchInput.value = ''
  localStorage.setItem('search', searchArr)
}

const search = (e, page) => {

  if (e) {
    e.preventDefault();
  }
  query = searchInput.value ? searchInput.value : query
  fetcher(query, page)
  handleStorage(query)
}

form.addEventListener('submit', (e) => {
  search(e)
});


// Pagination
navBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    if (btn.textContent === "prev" && page > 1) {
      search(null, page - 1)
      page -= 1;
    }
    if (btn.textContent === "next") {
      search(null, page + 1)
      page += 1
    }
  })
})


searchInput.addEventListener('focus', () => {
  autocomplete(searchInput, searchArr)
})
