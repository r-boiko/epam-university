const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const ROOT_DIR = path.resolve(__dirname, '../');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');

module.exports = merge(common, {
  devtool: 'source-map',
  optimization: {
    minimize: false,
  },
  devServer: {
    contentBase: path.join(DIST_DIR),
    compress: true,
    port: 9000,
    open: true,
  },
});
