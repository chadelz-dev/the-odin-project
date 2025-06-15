const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // Used for npm run build
    filename: 'bundle.js',
    publicPath: '/dist/', // Serve bundle at /dist/ in dev server
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname), // Serve index.html from project root
    },
    port: 8080,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true, // Serve index.html for 404s
  },
  stats: 'verbose', // Detailed logs for debugging
};
