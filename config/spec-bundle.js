// @ src/polyfills.ts
require('core-js/es6');
require('core-js/es7/reflect');
require('zone.js/dist/zone');
require('ts-helpers');
// src/polyfills.ts @

// @ src/vendor.ts
// require('rxjs/add/operator/map');
// src/vendor.ts @

// https://webpack.github.io/docs/context.html#require-context
const testsContext = require.context('../src', true, /\.spec\.ts/);
testsContext.keys().map(testsContext);
