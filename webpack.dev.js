const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    static: path.join(__dirname, 'dist'),
    port: 3000,
    compress: true,
    open: true,
    hot: true,
  },
});
