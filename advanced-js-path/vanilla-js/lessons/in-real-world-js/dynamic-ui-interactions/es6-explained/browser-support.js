// unique namespace for browser support example:
const BrowserSupport = {
  // es6 template literal example:
  createProductDescription(product) {
    return `${product.itemName} costs $${product.itemPrice}`; // template literal
  },

  // es5 equivalent for older browsers:
  createProductDescriptionES5(product) {
    return product.itemName + ' costs $' + product.itemPrice;
  },

  // display results in UI
  display() {
    const product = { itemName: 'Laptop', itemPrice: 999.99 };
    const es6Result = this.createProductDescription(product);
    const es5Result = this.createProductDescriptionES5(product);

    const output = document.getElementById('output');

    output.innerHTML = `
    <p>ES6 Template Literal: ${es6Result}</p>
    <p>ES5 Concatenation: ${es5Result}</p>
    `;

    console.log('ES6:', es6Result);
    console.log('ES5:', es5Result);
  },
};

// global function to trigger button onclick="runBrowserSupport()"
function runBrowserSupport() {
  BrowserSupport.display();
}
