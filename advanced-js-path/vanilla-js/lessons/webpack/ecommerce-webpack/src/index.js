// import css to style the card
import './styles.css';

// Imports product data and logs it
import { productData } from './product.js';

// creates a product card element
const cardElement = document.createElement('div');
cardElement.classList.add('card'); // adds a "card" class to the element

cardElement.innerHTML = `
    <h2>${productData.name}</h2>
    <p>Price: $${productData.price}</p>
`;

// add the card to the page
document.getElementById('card-container').appendChild(cardElement);
