var ExtractTextPlugin = require('extract-text-webpack-plugin-webpack-2');
const extractSass = new ExtractTextPlugin({});

var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: './',
    hot: true,
    historyApiFallback: true,
    inline: true,
    port: 3030
  },
  module: {
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: [
          'es2015',
          'react',
          'stage-2'
        ]
      }
    }, {
      test: /\.scss$/,
      loader: ["webpack-sass", "sass-loader"]
    }]
  }
};
