const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: [
    path.resolve(__dirname, 'src/js/main.js'),
    path.resolve(__dirname, 'src/scss/main.scss'),
  ],
  output: {
    filename: 'js/bundle.min.js',
    path: path.resolve(__dirname, 'dist'),
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
              failOnError: true,
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
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'dist/index.html'),
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'dist/blog.html'),
      template: path.resolve(__dirname, 'src/blog.html'),
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'dist/post.html'),
      template: path.resolve(__dirname, 'src/post.html'),
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/img'),
        to: path.resolve(__dirname, 'dist/img'),
      },
      {
        from: path.resolve(__dirname, 'src/fonts'),
        to: path.resolve(__dirname, 'dist/fonts'),
      },
      {
        from: path.resolve(__dirname, 'src/audio'),
        to: path.resolve(__dirname, 'dist/audio'),
      },
      {
        from: path.resolve(__dirname, 'src/video'),
        to: path.resolve(__dirname, 'dist/video'),
      },
    ]),
    new MiniCssExtractPlugin({
      filename: 'css/bundle.min.css',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    open: true,
  },
};
