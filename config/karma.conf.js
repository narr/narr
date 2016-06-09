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
      'karma-coverage',
      'karma-jasmine',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-remap-istanbul',
      'karma-webpack'
    ],
    preprocessors: {
      './config/spec-bundle.js': [
        'coverage', 'webpack'
      ]
    },
    webpack: require('./webpack.test.js'),
    reporters: ['mocha', 'coverage', 'karma-remap-istanbul'],
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'text-summary' },
        // { type: 'html' }
        {
          type: 'json',
          subdir: '.',
          file: 'coverage-final.json'
        }
      ]
    },
    remapIstanbulReporter: {
      src: 'coverage/coverage-final.json',
      reports: {
        html: 'coverage'
      },
      timeoutNotCreated: 1000,
      timeoutNoMoreFiles: 1000
    }
    // values => config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO ||
    // config.LOG_DEBUG
    // logLevel: config.LOG_INFO,
  });
};
