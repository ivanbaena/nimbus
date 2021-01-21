const path = require('path');

module.exports = {
  mode: 'development',
  entry: './apollo/index.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.mjs', '.js', '.gql', '.graphql', 'json'],
  },
  output: {
    filename: 'apollo.js',
    path: path.resolve(__dirname, 'dist/'),
  },
  target: 'node',
};
