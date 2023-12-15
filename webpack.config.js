const path = require('path');

module.exports = {
  mode: 'production', // or 'development'
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // Add any necessary plugins or optimizations here
};
