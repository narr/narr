const helpers = require('./helpers');
const Sprite = require('sprite-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = helpers.root('src');
const INDEX_SCSS_PATH = helpers.root('src/index.scss');
const FONT_AWESOME_SCSS_PATH = helpers.root('node_modules/font-awesome/scss/font-awesome.scss');
const ENTRY_ORDER = ['polyfills', 'vendor', 'main'];
const HMR = helpers.hasProcessFlag('--hot');
const HASH = HMR ? 'hash' : 'chunkhash';
const INDEX_PATH = helpers.root('src/index.html');
const ICON_PATH = /icon/;
const SPRITE_SRC_PATH = helpers.root('src/asset/img/icon/sprite');
const SPRITE_TARGET_PATH = helpers.root('temp/icon/sprite');
const md5Hash = HMR ? f => f : new WebpackMd5Hash();

module.exports = {
  metadata: {}, // for HtmlWebpackPlugin

  // http://webpack.github.io/docs/configuration.html#devtool
  // https://github.com/webpack/docs/wiki/build-performance#sourcemaps
  devtool: 'source-map',

  context: ROOT_PATH, // for entry and output path(for file loader)

  entry: {
    polyfills: [
      './polyfills.ts'
    ],
    vendor: [
      FONT_AWESOME_SCSS_PATH,
      './vendor.ts'
    ],
    main: [
      INDEX_SCSS_PATH,
      './app/main.ts'
    ]
  },

  // http://webpack.github.io/docs/configuration.html#output
  output: {
    publicPath: '/',
    filename: `js/[name].bundle.js?[${HASH}]`, // Cannot use [chunkhash] for HMR
    chunkFilename: `js/[name].chunk.js?[${HASH}]`
  },

  // http://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    extensions: ['', '.ts', '.js'],
    root: ROOT_PATH
  },

  // http://webpack.github.io/docs/configuration.html#module
  module: {
    preLoaders: [
      // https://github.com/wbuchwalter/tslint-loader
      {
        test: /\.ts$/,
        loaders: ['tslint']
      }
    ],
    loaders: [
      // https://github.com/jtangelder/sass-loader
      // https://github.com/postcss/postcss-loader
      // https://github.com/webpack/css-loader
      // https://github.com/bholloway/resolve-url-loader
      {
        test: /\.scss$/,
        include: [
          FONT_AWESOME_SCSS_PATH,
          INDEX_SCSS_PATH
        ],
        loader: ExtractTextPlugin.extract(['css?sourceMap', 'postcss', 'resolve-url',
          'sass?sourceMap'])
      },
      {
        test: /\.scss$/,
        exclude: [
          FONT_AWESOME_SCSS_PATH,
          INDEX_SCSS_PATH
        ],
        loaders: ['css', 'postcss', 'sass'] // don't need sourceMap for style tags
      },
      // https://github.com/webpack/file-loader
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
          ICON_PATH
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
      // https://github.com/webpack/raw-loader
      {
        test: /\.html$/,
        exclude: [INDEX_PATH],
        loaders: ['raw']
      },
      // https://github.com/TypeStrong/ts-loader
      {
        test: /\.ts$/,
        loaders: ['ts']
      }
    ]
  },
  postcss: () => [autoprefixer({ browsers: 'last 3 versions' })],

  plugins: [
    // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({
      ENV: JSON.stringify('development'),
      HMR: HMR
    }),

    // https://github.com/webpack/extract-text-webpack-plugin
    new ExtractTextPlugin('css/[name].bundle.css?[contenthash]'),

    // https://www.npmjs.com/package/webpack-md5-hash
    // https://github.com/webpack/webpack/issues/1315
    md5Hash,

    // https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
    // https://github.com/webpack/docs/wiki/optimization#multi-page-app
    new webpack.optimize.CommonsChunkPlugin({
      name: helpers.reverse(ENTRY_ORDER),
      minChunks: Infinity
    }),

    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: INDEX_PATH,
      chunksSortMode: helpers.packageSort(ENTRY_ORDER)
    }),

    // https://github.com/kezoo/sprite-webpack-plugin
    new Sprite({
      source: SPRITE_SRC_PATH,
      imgPath: SPRITE_TARGET_PATH,
      cssPath: SPRITE_TARGET_PATH,
      prefix: 'ic',
      spriteName: 'ics',
      processor: 'scss',
      bundleMode: 'multiple'
    })
  ]
};
