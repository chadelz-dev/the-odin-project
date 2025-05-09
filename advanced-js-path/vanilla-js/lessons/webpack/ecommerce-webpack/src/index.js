// import css to style the card
import './styles.css';

// Imports product data and logs it
import { productData } from './product.js';

// import images
import productImage from './images/product-image.jpg';

// creates a product card element
const cardElement = document.createElement('div');
cardElement.classList.add('card'); // adds a "card" class to the element

cardElement.innerHTML = `
    <h2>${productData.name}</h2>
    <p>Price: $${productData.price}</p>
`;

// add images dynamically
const imageElement = document.createElement('img');
imageElement.src = productImage;
imageElement.alt = 'Product Image of headphones';
imageElement.style.width = '80px';
imageElement.style.height = '80px';

cardElement.appendChild(imageElement);

// add the card to the page
document.getElementById('card-container').appendChild(cardElement);
