// Unique namespace for Babel example
const BabelExample = {
  productsList: [
    { id: 1, name: 'Laptop', price: 999.99 },
    { id: 2, name: 'Magic Mouse', price: 29.99 },
    { id: 3, name: 'Keyboard', price: 49.99 },
  ],

  // Modern ES6 code: Renders product cards using map and template literals
  renderProducts() {
    const output = document.getElementById('output');
    const es6Output = this.productsList
      .map(
        (product) => `
          <div class="product-card">
            ${product.name} - $${product.price}
          </div>
        `
      )
      .join(''); // Join array to string
    return es6Output; // Return for use in display
  },

  // Simulated Babel-transpiled ES5 code: Uses ES5 syntax for compatibility
  renderProductsES5() {
    var output = document.getElementById('output');
    var es5Output = this.productsList
      .map(function (product) {
        return (
          '<div class="product-card">' +
          product.name +
          ' - $' +
          product.price +
          '</div>'
        );
      })
      .join(''); // Correct: join called on map's array output
    return es5Output; // Return for use in display
  },

  // Display both ES6 and ES5 outputs in UI
  display() {
    const output = document.getElementById('output');
    // Clear previous content
    output.innerHTML = `
      <h3>Babel Example</h3>
      <div id="es6-section">
        <p>Running ES6 version...</p>
        ${this.renderProducts()}
      </div>
      <div id="es5-section">
        <p>Loading ES5 (transpiled) version...</p>
      </div>
    `;
    // Update ES5 section after delay for clarity
    setTimeout(() => {
      const es5Section = document.getElementById('es5-section');
      es5Section.innerHTML = `
        <p>Running ES5 (transpiled) version...</p>
        ${this.renderProductsES5()}
      `;
    }, 1000); // Delay to separate outputs
    console.log('Products:', this.productsList); // For debugging
  },
};

// Global function to trigger from button
function runBabelExample() {
  BabelExample.display();
}
