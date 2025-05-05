// ////////////////////////////////////////////////////////////////////////////

// example 5: mixing named and default exports
import shoppingCart, { formatCartPrice as formatPrice } from './cartModule.js';

const cart = new shoppingCart();

cart.addItem({ name: 'Macbook Pro', price: 1999.99 });

console.log('getItemCount:', cart.getItemCount());

console.log('cart item 1 name:', cart.cartItems[0].name);
console.log('formatCartPrice:', formatPrice(cart.cartItems[0].price));

/*

// ////////////////////////////////////////////////////////////////////////////

-- example 5: mixing named and default exports

-- what it does:

 - exports a cart class and utility function


-- how it works:

 - mixed exports: class (default) and function (named)

 - cartItems is private to this module


-- why it was used:

 - exports a primary export (default class) and a utility function (named export)

   - in this eg, primary export is: 
   
     export default class Cart {
       constructor() {
         this.cartItems = [];
       }

       addItem(item) {
         this.cartItems.push(item);
       }

       getItemCount() {
         return this.cartItems.length;
       }
     }

     - the default keyword makes it the primary export

   - utility function is: 

     export const formatCartPrice = (price) => `$${price.toFixed(2)}`;


 - interview questions: build a cart with utilities (utility functions)


-- when importing:
 
 - import shoppingCart, { formatCartPrice } from './cartModule.js';

   - import the default export without curly braces { }

     - import it using any name you want (in this case shoppingCart

     - you can only have one default export per file


   - import the named exports with curly braces { }

     - import it using any name you want (in this case formatPrice)
     
       - if so use the 'as' keyword 

     - Named exports are explicitly exported with the export keyword 
     
       - and also without the default keyword. 
       
       - You can have multiple named exports in a file, 
       
         - but only one default export.

*/
