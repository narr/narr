import 'ts-helpers';
import 'angular2-universal/polyfills';
import * as path from 'path';

import { generator } from './generator';
import { setViewEngine, templateName  } from './server';

import { AppComponent } from '../app/app.component';

// PROJECT_PATH, BASE_URL ==> webpack defined variable
const target = BASE_URL === '/narr/' ? './gh-pages' : './dist';
const INDEX_PATH = path.join(PROJECT_PATH, target, './index.tmpl');
const expressApp = setViewEngine(INDEX_PATH);

function generateHtml(pathArray: Array<string>) {
  for (let requestUrl of pathArray) {
    generator({
      // baseUrl: BASE_URL,
      // requestUrl,
      component: AppComponent,
      renderer: expressApp,
      indexFilename: templateName,
      targetPath: path.join(PROJECT_PATH, target, requestUrl)
    });
  }
}

const requestUrlArray = [
  '/'
  // '/about'
];
generateHtml(requestUrlArray);
