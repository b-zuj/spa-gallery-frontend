import { searchInput, ul } from './selectors';

export const createSuggestionsList = searchArr => {
  ul.innerHTML = '';
  searchArr.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
  ul.addEventListener('click', e => {
    if (e.target.tagName === 'LI') {
      searchInput.value = e.target.textContent;
    }
    ul.innerHTML = '';
  });
};

export const inputChangeHandler = (searchArr, e) => {
  const result = searchArr.map(item => {
    const lowerCaseItem = item.toLowerCase();
    const loweCaseTarget = e.target.value.toLowerCase();
    if (lowerCaseItem.match(loweCaseTarget)) {
      return item;
    }
    return undefined;
  }).filter(item => item);
  createSuggestionsList(result);
};

export const handleStorage = (queryString, searchArr) => {
  searchArr.push(queryString);
  searchArr = [...new Set(searchArr)];
  searchArr = searchArr.filter(item => item.trim().length > 0);
  searchInput.value = '';
  localStorage.setItem('search', searchArr);
};
