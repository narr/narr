const helpers = require('./helpers');
const Sprite = require('sprite-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const BASE_URL = '/';
const ROOT_PATH = helpers.root('src');

const INDEX_SCSS_PATH = helpers.root('src/index.scss');
const FONT_AWESOME_SCSS_PATH = helpers.root('node_modules/font-awesome/scss/font-awesome.scss');
const ENTRY_ORDER = ['polyfills', 'vendor', 'main'];

const HMR = helpers.hasProcessFlag('--hot');
const HASH = HMR ? 'hash' : 'chunkhash';
const INDEX_PATH = helpers.root('src/index.html');
const ICON_PATH = /icon/;
const SPRITE_SRC_PATH = helpers.root('src/asset/icon/sprite');
const SPRITE_TARGET_PATH = helpers.root('temp/icon/sprite');

const md5Hash = HMR ? f => f : new WebpackMd5Hash();

module.exports = {
  // custom data for index.html
  metadata: {
    ENV: ENV,
    baseUrl: BASE_URL
  },

  // http://webpack.github.io/docs/configuration.html#devtool
  // https://github.com/webpack/docs/wiki/build-performance#sourcemaps
  devtool: 'source-map',

  // for entry and output path
  context: ROOT_PATH,

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
      './main.browser.ts'
    ]
  },

  // http://webpack.github.io/docs/configuration.html#output
  output: {
    publicPath: BASE_URL,
    // Cannot use [chunkhash] for HMR
    filename: `js/[name].bundle.js?[${HASH}]`,
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
      // https://github.com/bholloway/resolve-url-loader
      {
        test: /\.scss$/,
        include: [
          FONT_AWESOME_SCSS_PATH,
          INDEX_SCSS_PATH
        ],
        loader: ExtractTextPlugin.extract(['css?sourceMap', 'postcss', 'resolve-url', 'sass?sourceMap'])
      },
      // https://github.com/jtangelder/sass-loader
      // https://github.com/postcss/postcss-loader
      // https://github.com/webpack/css-loader
      {
        test: /\.scss$/,
        exclude: [
          FONT_AWESOME_SCSS_PATH,
          INDEX_SCSS_PATH
        ],
        loaders: ['css', 'postcss', 'sass'] // no need sourceMap
      },
      // https://github.com/webpack/file-loader
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: [
          ICON_PATH
        ],
        loaders: [
          'file?name=asset/icon/[name].[ext]?[hash]'
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
      'process.env': {
        ENV: JSON.stringify(ENV),
        NODE_ENV: JSON.stringify(ENV)
      },
      ENV: JSON.stringify(ENV),
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
    }),

    // https://github.com/kevlened/copy-webpack-plugin
    // from: relative to context path
    // to: relative to out path
    // To overwrite sprite icon images again after they are copied by 'import'
    // as it sometimes doesn't copy the images rightly because of timing(?).
    // This plugin makes files builded one more time as they are watched
    new CopyWebpackPlugin(
      [
        // make 'to path' diffrent from SPRITE_TARGET_PATH so webpack-dev-server read
        // the sprite images properly
        { from: '../temp/icon/sprite/*.png', to: 'asset/icon', flatten: true }
      ],
      {
        ignore: [
          '.DS_Store'
        ]
      }
    )
  ],

  // https://webpack.github.io/docs/webpack-dev-server.html
  // https://github.com/webpack/webpack-dev-server/blob/2c9a461b3433bb9d58fa2cea576aab822b88d5fd/bin/webpack-dev-server.js
  devServer: {
    outputPath: helpers.root('temp') // for CopyWebpackPlugin in webpack-dev-server
  }
};
