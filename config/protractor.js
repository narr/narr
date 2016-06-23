/**
 * This is for E2E test(protractor) in Appveyor.
 * As of now, can't figure out to run http-server in background and do the e2e test with one CLI
 * in Appveyor. Tried to run http-server in background with 'START /B' or '&' but no luck.
 * So make this to do it with one command line(run server and execute protractor)
 */

const child_process = require('child_process');
const express = require('express');
const path = require('path');

class Protractor {
  server(port, dir) {
    const app = express();
    // console.log(process.cwd());
    let root = path.join(process.cwd(), dir);
    app.use(express.static(root));
    return new Promise((resolve, reject) => {
      const server = app.listen(port, () => {
        resolve(server);
      });
    });
  }

  getProtractorBinaryPath() {
    const result = require.resolve('protractor');
    // console.log(result);
    // /Users/narr/Data/Programming/Project/narr/node_modules/protractor/built/protractor.js
    // C:\Data\Project\narr\node_modules\protractor\built\protractor.js
    if (result) {
      const winExt = /^win/.test(process.platform) ? '.cmd' : '';
      const binPath = path.join(result, '../../../.bin/protractor' + winExt);
      // console.log(binPath);
      // /Users/narr/Data/Programming/Project/narr/node_modules/.bin/protractor
      // C:\Data\Project\narr\node_modules\.bin\protractor.cmd
      return binPath;
    }
    throw new Error('No protractor installation found.');
  }
}

module.exports = Protractor;

function cli() {
  const argv = process.argv.slice(2); // 0: port, 1: configName
  // console.log(argv);
  const configPath = path.join(__dirname, `protractor.${argv[1]}.js`);
  // console.log(configPath);
  const protractor = new Protractor();
  protractor.server(argv[0], './dist').then(server => {
    const child = child_process.spawn(protractor.getProtractorBinaryPath(), [configPath], {
      stdio: 'inherit'
    }).on('close', code => {
      // console.log(code);
      server.close();
      process.exit(0); // sometimes it hangs
    });
  });
}

if (!module.parent) {
  cli();
}
