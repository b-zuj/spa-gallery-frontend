import { JSDOM } from 'jsdom';
import htmlBuilder from './htmlBuilder';

const html = new JSDOM(`
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gallery</title>
</head>
<body>
  <main id="main">
  </main>
</body>
</html>
`);

const mainContainer = html.window.document.querySelector('#main');

const data = [
  {
    alt_description: 'silver tabby kitten on floor',
    urls: {
      small: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE3NTg0M30',
    },
  },
];

test('Should return article element', () => {
  mainContainer.innerHTML = `
  <article class="card">
    <div class="flipcard-inner">
      <div class="flipcard-front" style="background-image: url(&quot;https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=400&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3NTgwNn0&quot;);">
      </div>
      <div class="flipcard-back">
        <p>silver tabby kitten on floor</p>
      </div>
    </div>
  </article>
  `;

  expect(htmlBuilder(data, mainContainer)).toBe(mainContainer.innerHTML);
});
