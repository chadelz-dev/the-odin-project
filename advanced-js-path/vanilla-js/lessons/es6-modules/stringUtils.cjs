// ////////////////////////////////////////////////////////////////////////////

// example 9: CommonJS

// CommonJS Node.js string utility
const capitalizeStrCJS = (str) => str.toUpperCase();

module.exports = { capitalizeStrCJS };

// you need to run this with node, it will fail in the browser

// it is here for syntax purposes, it is not being imported by stringConsumer.js
