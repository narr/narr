// @ src/polyfills.ts
require('core-js/es6');
require('core-js/es7/reflect');
require('zone.js/dist/zone');
require('zone.js/dist/async-test'); // for async tests
require('zone.js/dist/fake-async-test'); // for fake-async tests
require('ts-helpers');
// src/polyfills.ts @

// @ src/vendor.ts
require('rxjs/add/operator/delay');
require('rxjs/add/operator/map');
require('rxjs/add/operator/throttleTime');
// src/vendor.ts @

// https://webpack.github.io/docs/context.html#require-context
const testsContext = require.context('../src', true, /\.spec\.ts/);
testsContext.keys().map(testsContext);
