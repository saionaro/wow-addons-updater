const Webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NODE_ENV = process.env.NODE_ENV || 'development';
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pathsToClean = [
  'dist/*'
];

const cleanOptions = {
  exclude:  ['.gitkeep'],
};

module.exports = {
  mode: 'production',
  optimization: {
    minimize: NODE_ENV === 'production',
  },
  entry: {
    app: ['./src/electron-renderer/index.tsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/dist/',
    filename: '[name].bundle.js',
    library: '[name]',
    libraryTarget: 'var'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.less']
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
      test: /\.tsx?$/,
      use: ['awesome-typescript-loader'],
    }, {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    }, {
      test: /\.svg$/,
      use: ['svg-url-loader'],
    }]
  }
};
