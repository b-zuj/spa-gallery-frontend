export default (data, container) => {
  const containerElement = container;
  if (containerElement.innerHTML !== '') {
    containerElement.innerHTML = '';
  }
  let html = '';
  data.forEach(picture => {
    const article = document.createElement('article');
    article.classList.add('card');

    const innerCard = document.createElement('div');
    innerCard.classList.add('flipcard-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('flipcard-front');
    cardFront.style.backgroundImage = `url(${picture.urls.small})`;

    const cardBack = document.createElement('div');
    cardBack.classList.add('flipcard-back');

    const p = document.createElement('p');
    p.textContent = picture.alt_description;

    cardBack.appendChild(p);

    innerCard.appendChild(cardFront);
    innerCard.appendChild(cardBack);
    article.appendChild(innerCard);
    html += article.outerHTML;
  });
  containerElement.innerHTML = html;
  return html;
};
