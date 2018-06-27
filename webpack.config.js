const Webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NODE_ENV = process.env.NODE_ENV || 'development';
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pathsToClean = [
  'dist'
];

const cleanOptions = {};

module.exports = {
  mode: 'production',
  optimization: {
    minimize: false,
  },
  entry: {
    app: ['./src/electron-renderer/index.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/dist/',
    filename: '[name].bundle.js',
    library: '[name]',
    libraryTarget: 'var'
  },
  resolve: {
    extensions: ['.js', '.less']
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new CopyWebpackPlugin([{
      from: './src/index.html',
      to: '.'
    }]),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new Webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(NODE_ENV)
      }
    })
  ],
  module: {
    rules: [{
      test: /\.css|\.less$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'less-loader'
      ],
    }, {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    }]
  }
};
