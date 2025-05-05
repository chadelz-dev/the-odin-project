// ////////////////////////////////////////////////////////////////////////////

// example 5: mixing named and default exports

// default export: cart class
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

// named exports: utility functions (like price formatter)
export const formatCartPrice = (price) => `$${price.toFixed(2)}`;
