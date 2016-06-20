import {
  // BASE_URL,
  // enableProdMode,
  ExpressEngineConfig,
  // ORIGIN_URL,
  provide
  // REQUEST_URL
} from 'angular2-universal';
import * as fs from 'fs';
const minify = require('html-minifier').minify;

import { DIRECTIVES, PIPES, PROVIDERS } from '../platform/node';

interface GeneratorOption {
  // originUrl: string; // 'http://localhost:3000'
  // baseUrl: string;
  // requestUrl: string;
  component: any;
  renderer: any;
  indexFilename: string;
  targetPath: string;
}

export function generator(options: GeneratorOption) {
  const config: ExpressEngineConfig = {
    // platformProviders: [
    // provide(ORIGIN_URL, { useValue: options.originUrl }),
    // provide(ORIGIN_URL, { useValue: '' }),
    // provide(BASE_URL, { useValue: options.baseUrl })
    // ],
    providers: [
      ...DIRECTIVES,
      ...PIPES,
      ...PROVIDERS,
      // provide(REQUEST_URL, { useValue: options.requestUrl })
    ],
    directives: [options.component],
    // async: false,
    // preboot: false // preboot: { appRoot: 'app' } // your top level app component selector
  };

  options.renderer.render(options.indexFilename, config, (err, html) => {
    if (err) {
      console.log(err);
      return;
    }
    try {
      fs.accessSync(options.targetPath);
    } catch (e) {
      fs.mkdirSync(options.targetPath);
    }
    console.log(html);
    const minifiedHtml = minify(html, {
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
      collapseWhitespace: true
    });
    // console.log(minifiedHtml);
    fs.writeFileSync(options.targetPath + '/index.html', minifiedHtml);
  });
}

// enableProdMode();
