const helpers = require('./helpers');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const IS_FOR_GITHUB_PAGE = helpers.hasProcessFlag('-my-ghp');
const BASE_URL = IS_FOR_GITHUB_PAGE ? '/narr/' : '/';
const ROOT_PATH = helpers.root('src');
const ICON_PATH = /icon/;

module.exports = {
  context: ROOT_PATH,
  entry: './ng-html-generator',
  output: {
    publicPath: BASE_URL,
    path: helpers.root('temp/ng-html'),
    filename: 'generator.bundle.js'
  },
  resolve: {
    extensions: ['', '.ts', '.js'],
    root: ROOT_PATH
  },
  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loaders: ['tslint']
      }
    ],
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['css', 'postcss', 'sass']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: [
          ICON_PATH
        ],
        loaders: [
          'file?name=asset/img/ic/[name].[ext]?[hash]'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: [
          ICON_PATH,
          /node_modules\/font-awesome/
        ],
        loaders: [
          'file?name=asset/img/[name].[ext]?[hash]'
        ]
      },
      {
        test: /\.(otf|woff|woff2|ttf|eot|svg)(\?.*?)?$/i,
        loaders: [
          'file?name=asset/font/[name].[ext]?[hash]'
        ]
      },
      {
        test: /\.html$/,
        loaders: ['raw']
      },
      {
        test: /\.ts$/,
        loaders: ['ts']
      }
    ]
  },
  postcss: () => [autoprefixer({ browsers: 'last 3 versions' })],
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('ng-html'),
      // @ for ng-html
      Window: JSON.stringify('Window'),
      PROJECT_PATH: JSON.stringify(helpers.root()),
      BASE_URL: JSON.stringify(BASE_URL)
      // for ng-html @
    })
  ],
  target: 'node',
  externals: [
    // https://github.com/liady/webpack-node-externals
    nodeExternals({})
  ],
};
