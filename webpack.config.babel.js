import webpack from 'webpack';
import path from 'path';
import camelCase from 'camelcase';
import pkg from './package.json';

const { NODE_ENV } = process.env;

const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
  }),
];

export default {
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
      }],
    }],
  },

  mode: NODE_ENV || 'development',

  entry: [
    './src/index',
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: `${pkg.name}${NODE_ENV === 'production' ? '.min' : ''}.js`,
    library: camelCase(pkg.name),
    libraryTarget: 'umd',
  },

  plugins,
};
