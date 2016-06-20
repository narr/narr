const helpers = require('./helpers');
const rimraf = require('rimraf');
const Sprite = require('sprite-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');
const copy = require('copy');
const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const IS_FOR_GITHUB_PAGE = helpers.hasProcessFlag('-my-ghp');
const BASE_URL = IS_FOR_GITHUB_PAGE ? '/narr/' : '/';
const ROOT_PATH = helpers.root('src');
const INDEX_SCSS_PATH = helpers.root('src/index.scss');
const FONT_AWESOME_SCSS_PATH = helpers.root('node_modules/font-awesome/scss/font-awesome.scss');
const ENTRY_ORDER = ['polyfills', 'vendor', 'main'];
const OUTPUT_PATH = IS_FOR_GITHUB_PAGE ? helpers.root('gh-pages') : helpers.root('dist');
const INDEX_PATH = helpers.root('src/index.html');
const ICON_PATH = /icon/;
const SPRITE_SRC_PATH = helpers.root('src/asset/img/icon/sprite');
const SPRITE_TARGET_PATH = helpers.root('temp/icon/sprite');
const IS_DEV_MODE = helpers.hasProcessFlag('-my-dev');

rimraf.sync(helpers.root('temp'));
rimraf.sync(OUTPUT_PATH);

function copyAfterDone() {
  // @ robots.txt
  copy(helpers.root('src/asset/robots.txt'), OUTPUT_PATH, {
    flatten: true
  }, (err, file) => {
    if (err) {
      console.log(err);
    }
  });
  // robots.txt @

  // @ sprite
  // To copy sprite icon images after the process of imaging is done
  // As it is not ready to be copied, when it is imported by 'SCSS' and be handled by 'file-loader'
  // in webpack
  // const path = helpers.join(SPRITE_TARGET_PATH, '*.png');
  // const out = helpers.join(OUTPUT_PATH, 'asset/img/ic');
  // setTimeout(() => {
  //   copy(path, out, function (err, file) {
  //     if (err) {
  //       console.log(err);
  //     }
  //   });
  // }, 1000); // a delay for Sprite plugin to finish making images
  // sprite @
}

function rename(src, dest) {
  var cbCalled = false;
  var rd;
  var wr;

  function done(err) {
    if (!cbCalled) {
      if (err) {
        console.log(err);
      }
      cbCalled = true;
    }
  }

  rd = fs.createReadStream(src);
  rd.on('error', done);

  wr = fs.createWriteStream(dest);
  wr.on('error', done);
  wr.on('close', () => {
    done();
  });

  rd.pipe(wr);
}

module.exports = {
  metadata: {
    ga: IS_FOR_GITHUB_PAGE
    // baseUrl: BASE_URL
  },
  devtool: 'source-map',
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
      './app/main.ts'
    ]
  },
  output: {
    publicPath: BASE_URL,
    path: OUTPUT_PATH,
    filename: 'js/[name].bundle.js?[chunkhash]',
    chunkFilename: 'js/[name].chunk.js?[chunkhash]'
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
        include: [
          FONT_AWESOME_SCSS_PATH,
          INDEX_SCSS_PATH
        ],
        // to disable removing vendor prefixes, add '-autoprefixer' option
        loader: ExtractTextPlugin.extract(['css?sourceMap&-autoprefixer', 'postcss', 'resolve-url',
          'sass?sourceMap'])
      },
      {
        test: /\.scss$/,
        exclude: [
          FONT_AWESOME_SCSS_PATH,
          INDEX_SCSS_PATH
        ],
        loaders: ['css?-autoprefixer', 'postcss', 'sass']
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
        exclude: [INDEX_PATH],
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
      ENV: JSON.stringify('production')
    }),
    new ExtractTextPlugin('css/[name].bundle.css?[contenthash]'),
    new WebpackMd5Hash(),
    new webpack.optimize.CommonsChunkPlugin({
      name: helpers.reverse(ENTRY_ORDER),
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      // https://github.com/kangax/html-minifier#options-quick-reference
      minify: {
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true
      },
      template: INDEX_PATH,
      chunksSortMode: helpers.packageSort(ENTRY_ORDER)
    }),
    new Sprite({
      source: SPRITE_SRC_PATH,
      imgPath: SPRITE_TARGET_PATH,
      cssPath: SPRITE_TARGET_PATH,
      prefix: 'ic',
      spriteName: 'ics',
      processor: 'scss',
      bundleMode: 'multiple'
    }),

    // https://github.com/webpack/docs/wiki/optimization#deduplication
    new webpack.optimize.DedupePlugin(),

    IS_DEV_MODE ? f => f :
      // https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // https://github.com/mishoo/UglifyJS2
      new webpack.optimize.UglifyJsPlugin({
        // mangle: false,
        // beautify: true,
        // comments: false
        compress: {
          drop_console: true
        }
      }),

    function done() {
      this.plugin('done', stats => {
        if (stats.compilation.errors && stats.compilation.errors.length) {
          // console.log(stats.compilation.errors);
          console.log(stats.compilation.errors[0]);
          process.exit(1);
        } else {
          const src = helpers.join(OUTPUT_PATH, 'index.html');
          const dest = helpers.join(OUTPUT_PATH, 'index.tmpl');
          rename(src, dest);
          copyAfterDone();
        }
      });
    }
  ]
};
