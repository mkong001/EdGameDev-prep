const path = require('path');
const merge = require('webpack-merge');
const prod = require('./webpack.prod');

ghpages = {
  output: {
    publicPath: '/baby-yoda-test/'
  }
};

module.exports = merge(prod, ghpages);
