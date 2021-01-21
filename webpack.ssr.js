const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const config = {
  mode: 'development',
  entry: './src/index.ts',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.tsx', '.ts', '.js', '.mjs', '.css', '.scss'],
  },
  output: {
    filename: 'ssr.js',
    path: path.resolve(__dirname, 'dist/'),
  },
  target: 'node',
  externals: [webpackNodeExternals()],
};

module.exports = merge(baseConfig, config);
