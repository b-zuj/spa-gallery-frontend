import '../styles/main.scss';

const frontCards = document.querySelectorAll('.flipcard-front');
const backCards = document.querySelectorAll('.flipcard-back');

fetch(`https://api.unsplash.com/photos/random?count=${frontCards.length}&client_id=zniu4K8oGgiANYwLy20uLMtdphNxjUpHAbnWT26F96s`)
.then(response => response.json())
.then(imageJSON => {
  // const urls = parsed.map(el => el.urls.small);


  for(let i = 0; i < frontCards.length; i++){
    const imageElement = document.createElement('img');
    imageElement.src = imageJSON[i].urls.small;
    imageElement.style.width = '100%';
    imageElement.style.height = '100%';
    imageElement.style.objectFit = 'cover';
    frontCards[i].append(imageElement)

    backCards[i].innerHTML = `${imageJSON[i].user.name}<br>${imageJSON[i].user.bio}`
  }
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

