const webpack = require('webpack');
const path = require('path');
var plugins = require('webpack-load-plugins')();

module.exports = {
  entry: './src/sample-ui.js',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'sample-ui.js',
    library: 'sampleUI',
    libraryTarget: 'umd',
  },
};


