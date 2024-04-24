const { merge } = require('webpack-merge');
const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    open: true,
    compress: true,
    port: 9000,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/public/"),
          to: path.resolve(__dirname, "dist/"),
        },
        {
          from: path.resolve(__dirname, "src/public/images/heros/hero.jpg"),
          to: path.resolve(__dirname, "dist/images/heros/hero-small.jpg"),
        },
        {
          from: path.resolve(__dirname, "src/public/images/heros/hero.jpg"),
          to: path.resolve(__dirname, "dist/images/heros/hero-large.jpg"),
        },
      ],
    }),
  ],
});
