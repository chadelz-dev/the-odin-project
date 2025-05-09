const path = require('path'); // Helps Webpack find the dist/ folder
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // Makes the bundle readable for debugging
  entry: './src/index.js', // Starts bundling here
  output: {
    filename: 'main.js', // Name of the bundled file
    path: path.resolve(__dirname, 'dist'), // Puts it in dist/
    clean: true, // Clears dist/ before each build
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html', // Copies this to dist/index.html
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i, // find the css files
        use: ['style-loader', 'css-loader'], // processes the CSS files
      },
      {
        test: /\.html$/i, // find the html files
        loader: 'html-loader', // processes the html files
      },
      {
        test: /\.(png|jpg|jpeg)$/i, // find the images and bundle them
        type: 'asset/resource',
      },
    ],
  },
};
