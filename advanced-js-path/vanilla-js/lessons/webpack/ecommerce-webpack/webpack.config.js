const path = require('path'); // Helps Webpack find the dist/ folder

module.exports = {
  mode: 'development', // Makes the bundle readable for debugging
  entry: './src/index.js', // Starts bundling here
  output: {
    filename: 'main.js', // Name of the bundled file
    path: path.resolve(__dirname, 'dist'), // Puts it in dist/
    clean: true, // Clears dist/ before each build
  },
};
