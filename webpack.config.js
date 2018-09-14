const webpack = require('webpack');

module.exports = {
  entry: {
    main: './index.web.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
       test: /\.(png|jpg)$/,
       loader: 'url-loader?limit=25000'
     }
    ],
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
  },
};
