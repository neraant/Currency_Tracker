const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

const env = dotenv.config().parsed || {};

const envKeys = Object.keys(env).reduce((acc, key) => {
  acc[`process.env.${key}`] = JSON.stringify(env[key]);
  return acc;
}, {});

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env),
      ...envKeys,
    }),
  ],
  devServer: {
    historyApiFallback: true,
    static: path.join(__dirname, 'dist'),
    port: 3000,
    compress: true,
    open: true,
    hot: true,
    client: {
      overlay: true,
    },
  },
});
