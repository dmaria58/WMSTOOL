// This config is for building dist files
const webpack = require('webpack');
const getWebpackConfig = require('./webpacktool/getWebpackConfig');
const webpackConfig = getWebpackConfig(false);

module.exports = webpackConfig;
