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
  if (true === HMR) {
    const ngHmr = require('angular2-hmr');
    ngHmr.hotModuleReplacement(main, module);
  } else {
    document.addEventListener('DOMContentLoaded', () => main());
  }
} else {
  require('@angular/core').enableProdMode();
  document.addEventListener('DOMContentLoaded', () => main());
}

// @ Progressive Wep App
if ('production' === ENV && 'serviceWorker' in navigator) {
  const filename = require('file?name=[name].js?[hash]!' +
    '../../config/my-loader?name=service-worker!../service-worker.ts');

  // to print out in a build version of webpack(as it removes 'console.log')
  const myConsole = console;
  // myConsole.log(filename);
  (<any>navigator).serviceWorker.register(filename).then(() => {
    myConsole.log('Service Worker Registered..!!');
  }).catch(e => {
    myConsole.log(e);
  });

  // unregister
  // (<any>navigator).serviceWorker.getRegistration().then(ServiceWorkerRegistration => {
  //   // myConsole.log('Service Worker Unregistered..!!');
  //   ServiceWorkerRegistration.unregister();
  // });
}

require('asset/img/icon/ic.narr.128x128.png');
require('asset/img/icon/ic.narr.144x144.png');
require('asset/img/icon/ic.narr.152x152.png');
require('asset/img/icon/ic.narr.192x192.png');
require('asset/img/icon/ic.narr.256x256.png');
// Progressive Wep App @
