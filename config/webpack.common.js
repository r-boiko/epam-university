const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ROOT_DIR = path.resolve(__dirname, '../');
const SRC_DIR = path.resolve(ROOT_DIR, 'src');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');

module.exports = {
  entry: [
    path.resolve(SRC_DIR, 'js/main.js'),
    path.resolve(SRC_DIR, 'scss/main.scss'),
  ],
  output: {
    filename: 'js/bundle.min.js',
    path: path.resolve(DIST_DIR),
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          {
            loader: 'eslint-loader',
            options: {
              // failOnError: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: path.resolve(DIST_DIR, 'index.html'),
      template: path.resolve(SRC_DIR, 'index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(DIST_DIR, 'blog.html'),
      template: path.resolve(SRC_DIR, 'blog.html'),
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(DIST_DIR, 'post.html'),
      template: path.resolve(SRC_DIR, 'post.html'),
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(SRC_DIR, 'img'),
        to: path.resolve(DIST_DIR, 'img'),
      },
      {
        from: path.resolve(SRC_DIR, 'fonts'),
        to: path.resolve(DIST_DIR, 'fonts'),
      },
      {
        from: path.resolve(SRC_DIR, 'audio'),
        to: path.resolve(DIST_DIR, 'audio'),
      },
      {
        from: path.resolve(SRC_DIR, 'video'),
        to: path.resolve(DIST_DIR, 'video'),
      },
    ]),
    new MiniCssExtractPlugin({
      filename: 'css/bundle.min.css',
    }),
  ],
};
