const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

module.exports = function () {
  return webpackMerge(baseConfig(), {
    devtool: 'source-map',
  });
};