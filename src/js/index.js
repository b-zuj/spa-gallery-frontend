import '../styles/main.scss';

const flipCards = document.querySelectorAll('.flipcard-front');
console.log(flipCards)

flipCards.forEach(element => {
  console.log(element)
});

fetch(`https://api.unsplash.com/photos/random?count=${flipCards.length}&client_id=zniu4K8oGgiANYwLy20uLMtdphNxjUpHAbnWT26F96s`)
.then(response => response.json())
.then(parsed => {
  const urls = parsed.map(el => el.urls.small);
  flipCards.forEach((card, i) => {
    const imageElement = document.createElement('img');
    imageElement.src = urls[i];
    imageElement.style.width = '100%';
    imageElement.style.height = '100%';
    imageElement.style.objectFit = 'cover';


    card.append(imageElement)
  })
})



// fetch("https://api.unsplash.com/photos/random?client_id=zniu4K8oGgiANYwLy20uLMtdphNxjUpHAbnWT26F96s")
// .then(response => response.json())
// .then(parsed => parsed.urls.thumb)
// .then(url => {
//   // const flipCard = document.querySelector('.flipcard-front');
//   const imageElement = document.createElement('img');
//   imageElement.src = url;
//   flipCard.append(imageElement)
// });

// .then(parsed => {
//   console.log(parsed)
//   const flipcard = document.querySelector('.flipcard-front');

//   cardText.textContent = JSON.stringify(parsed);
// })

