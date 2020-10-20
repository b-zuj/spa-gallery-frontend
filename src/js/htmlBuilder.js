const main = document.querySelector('#main')


export const htmlBuilder = (data) => {
  if (main.innerHTML !== "") {
    main.innerHTML = ""
  }
  data.forEach(picture => {
    const article = document.createElement('article')
    article.classList.add('card')

    const innerCard = document.createElement('div')
    innerCard.classList.add('flipcard-inner')

    const cardFront = document.createElement('div')
    cardFront.classList.add('flipcard-front')
    cardFront.style.backgroundImage = `url(${picture.urls.small})`

    const cardBack = document.createElement('div')
    cardBack.classList.add('flipcard-back')

    const p = document.createElement('p')
    p.textContent = picture.alt_description

    cardBack.appendChild(p)

    innerCard.appendChild(cardFront)
    innerCard.appendChild(cardBack)
    article.appendChild(innerCard)
    main.appendChild(article)
  })
}
