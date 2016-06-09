const helpers = require('./helpers');
const webpack = require('webpack');
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

module.exports = {
  resolve: {
    extensions: ['', '.ts', '.js'],
    root: helpers.root('src')
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
        loaders: ['null']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['null']
      },
      {
        test: /\.html$/,
        loaders: ['null']
      },
      {
        test: /\.ts$/,
        loaders: ['ts']
      }
    ],
    postLoaders: [
      // https://github.com/deepsweet/istanbul-instrumenter-loader
      {
        test: /\.ts$/,
        loaders: ['istanbul-instrumenter'],
        include: helpers.root('src'),
        exclude: [
          /\.spec\.ts$/
        ]
      }
    ]
  },
  ts: { // to generate coverages
    compilerOptions: {
      sourceMap: false,
      inlineSourceMap: true
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(ENV),
        NODE_ENV: JSON.stringify(ENV)
      },
      ENV: JSON.stringify(ENV),
      HMR: false
    }),
  ]
};
