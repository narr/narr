// http://stackoverflow.com/questions/35527130/error-while-importing-express
import * as express from 'express';
import { expressEngine } from 'angular2-universal';

const app = express();
export let templateName;

export function setViewEngine(indexPath: string) {
  const lastSlashIdx = indexPath.lastIndexOf('/');
  let path;
  let filename;
  let ext;

  if (lastSlashIdx === -1) {
    path = __dirname;
    filename = indexPath;
  } else {
    path = indexPath.substring(0, lastSlashIdx);
    filename = indexPath.substr(lastSlashIdx + 1);
  }

  // console.log(indexPath);
  // console.log(path);
  // console.log(filename);

  const matchArray = filename.match(/^(.*?)\.(.*?)$/);
  if (matchArray.length === 3) {
    templateName = matchArray[1];
    ext = matchArray[2];
  } else {
    throw Error('invalid indexPath..!!');
  }

  app.set('views', path);
  app.engine(ext, expressEngine);
  app.set('view engine', ext);
  return app;
}
