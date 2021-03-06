require('ts-node/register');

const helpers = require('./helpers');
const SpecReporter = require('jasmine-spec-reporter');

// https://github.com/angular/protractor/blob/master/docs/referenceConf.js
exports.config = {

  directConnect: false, // this should be false for IE

  baseUrl: 'http://localhost:8080/',

  specs: [
    helpers.root('src/**/*.e2e-spec.ts')
  ],
  exclude: [],

  framework: 'jasmine2',
  jasmineNodeOpts: {
    // https://github.com/bcaudan/jasmine-spec-reporter/blob/master/docs/protractor-configuration.md
    print: f => f
  },

  onPrepare: () => {
    // https://github.com/bcaudan/jasmine-spec-reporter/blob/master/docs/protractor-configuration.md
    jasmine.getEnv().addReporter(new SpecReporter({ displayStacktrace: 'all' }));
    // use below coz 'useAllAngular2AppRoots' doesn't work as of now
    browser.ignoreSynchronization = true; // for a non-angular site or for async
    // browser.driver.manage().window().maximize();
    browser.driver.manage().window().setSize(1024, 800);
  },

  capabilities: {
    browserName: 'internet explorer'
  },

  localSeleniumStandaloneOpts: {
    // https://github.com/angular/protractor/issues/2728
    args: ['-Djna.nosys=true']
  }

  // https://github.com/angular/protractor/issues/3174
  // useAllAngular2AppRoots: true
};
