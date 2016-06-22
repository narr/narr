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

  getProtractorBinary(binaryName) {
    const winExt = /^win/.test(process.platform) ? '.cmd' : '';
    const pkgPath = require.resolve('protractor');
    const protractorDir = path.resolve(path.join(path.dirname(pkgPath), '..', 'bin'));
    return path.join(protractorDir, '/' + binaryName + winExt);
  }
}

module.exports = Protractor;

function cli() {
  const protractor = new Protractor();
  protractor.server(8080, './dist').then(server => {
    const argv = process.argv.slice(3); // forward args to protractor
    // console.log(argv);
    child_process.spawn(protractor.getProtractorBinary('protractor'), argv, {
      stdio: 'inherit'
    }).once('close', () => {
      server.close();
    });
  });
}

if (!module.parent) {
  cli();
}
