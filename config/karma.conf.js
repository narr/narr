// http://karma-runner.github.io/0.13/config/configuration-file.html
module.exports = config => {
  config.set({
    browsers: [
      'PhantomJS'
    ],
    frameworks: ['jasmine'],
    basePath: '../',
    files: [
      './config/spec-bundle.js'
    ],
    exclude: [],
    plugins: [
      'karma-webpack',
      'karma-coverage',
      'karma-jasmine',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
    ],
    preprocessors: {
      './config/spec-bundle.js': [
        'coverage', 'webpack'
      ]
    },
    webpack: require('./webpack.test.js'),
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'text-summary' },
        { type: 'html' }
      ]
    }
    // values => config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO ||
    // config.LOG_DEBUG
    // logLevel: config.LOG_INFO,
  });
};
