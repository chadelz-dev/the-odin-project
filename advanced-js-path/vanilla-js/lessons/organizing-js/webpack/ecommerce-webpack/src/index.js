// import css to style the card
import './styles.css';

// Imports product data
import productsList from './data/products.csv';

// import images
import headphonesImage from './images/headphones.jpg';
import speakerImage from './images/bluetooth-speaker.jpg';

// Maps image variables to the image file names
const imageMap = {
  'headphones.jpg': headphonesImage,
  'bluetooth-speaker.jpg': speakerImage,
};

// Gets the card-container element
const container = document.getElementById('card-container');

// Loops through the products and creates a card for each
productsList.forEach((product) => {
  // Creates a product card element
  const cardElement = document.createElement('div');

  // Adds a class to the card
  cardElement.classList.add('card');

  // Creates a product card element
  cardElement.innerHTML = `
    <h2>${product.name}</h2>
    <p>Price: $${product.price}</p>
  `;

  // Creates an image element
  const imageElement = document.createElement('img');

  // Updates the path to the image and adds alt text
  imageElement.src = imageMap[product.image];
  imageElement.alt = product.name;

  // Adds image dynamically
  cardElement.appendChild(imageElement);

  // Adds the card to the page
  container.appendChild(cardElement);
});
