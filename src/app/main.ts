import { bootstrap } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';
import { DIRECTIVES, PIPES, PROVIDERS } from '../platform/browser';

function main() {
  return bootstrap(AppComponent, [
    ...DIRECTIVES,
    ...PIPES,
    ...PROVIDERS
  ]);
}

if ('development' === ENV) {
  // HMR does't work with IE 9
  const ie9 = document.querySelector('html').className.indexOf('ie9');
  if (true === HMR && -1 === ie9) {
    const ngHmr = require('angular2-hmr');
    ngHmr.hotModuleReplacement(main, module);
  } else {
    document.addEventListener('DOMContentLoaded', () => main());
  }
} else {
  require('@angular/core').enableProdMode();
  document.addEventListener('DOMContentLoaded', () => main());
}
