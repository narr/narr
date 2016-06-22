// const child_process = require('child_process');
// const express = require('express');
// const path = require('path');

// class Protractor {
//   server(port, dir) {
//     const app = express();
//     // console.log(process.cwd());
//     let root = path.join(process.cwd(), dir);
//     app.use(express.static(root));
//     return new Promise((resolve, reject) => {
//       const server = app.listen(port, () => {
//         resolve(server);
//       });
//     });
//   }

//   getProtractorBinary(binaryName) {
//     const winExt = /^win/.test(process.platform) ? '.cmd' : '';
//     const pkgPath = require.resolve('protractor');
//     const protractorDir = path.resolve(path.join(path.dirname(pkgPath), '..', 'bin'));
//     return path.join(protractorDir, '/' + binaryName + winExt);
//   }
// }

// module.exports = Protractor;

// function cli() {
//   const protractor = new Protractor();
//   protractor.server(8080, './dist').then(server => {
//     const argv = process.argv.slice(3); // forward args to protractor
//     // console.log(argv);
//     child_process.spawn(protractor.getProtractorBinary('protractor'), argv, {
//       stdio: 'inherit'
//     }).once('close', () => {
//       server.close();
//     });
//   });
// }

// if (!module.parent) {
//   cli();
// }

var es = require('event-stream');
var fs = require('fs');
var path = require('path');
var child_process = require('child_process');
// var async = require('async');
// var PluginError = require('gulp-util').PluginError;
var winExt = /^win/.test(process.platform) ? ".cmd" : "";

// optimization: cache for protractor binaries directory
var protractorDir = null;

function getProtractorDir() {
  if (protractorDir) {
    return protractorDir;
  }
  var result = require.resolve("protractor");
  if (result) {
    // result is now something like
    // c:\\Source\\gulp-protractor\\node_modules\\protractor\\lib\\protractor.js
    protractorDir = path.resolve(path.join(path.dirname(result), "..", "..", ".bin"));
    return protractorDir;
  }
  throw new Error("No protractor installation found.");
}

var protractor = function (options) {
  var files = [],
    child, args;

  options = options || {};
  args = options.args || [];

  return es.through(function (file) {
    files.push(file.path);
    this.push(file);
  }, function () {
    var stream = this;

    // Enable debug mode
    if (options.debug) {
      args.push('debug');
    }

    // Attach Files, if any
    if (files.length) {
      args.push('--specs');
      args.push(files.join(','));
    }

    // Pass in the config file
    if (options.configFile) {
      args.unshift(options.configFile);
    }

    child = child_process.spawn(path.resolve(getProtractorDir() + '/protractor' + winExt), args, {
      stdio: 'inherit',
      env: process.env
    }).on('exit', function (code) {
      if (child) {
        child.kill();
      }
      if (stream) {
        if (code) {
          stream.emit('error', new PluginError('gulp-protractor', 'protractor exited with code ' + code));
        }
        else {
          stream.emit('end');
        }
      }
    });
  });
};







const express = require('express');

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

  // getProtractorBinary(binaryName) {
  //   const winExt = /^win/.test(process.platform) ? '.cmd' : '';
  //   const pkgPath = require.resolve('protractor');
  //   const protractorDir = path.resolve(path.join(path.dirname(pkgPath), '..', 'bin'));
  //   return path.join(protractorDir, '/' + binaryName + winExt);
  // }
}

// function cli() {
//   const protractor = new Protractor();
//   protractor.server(8080, './dist').then(server => {
//     const argv = process.argv.slice(3); // forward args to protractor
//     // console.log(argv);
//     child_process.spawn(protractor.getProtractorBinary('protractor'), argv, {
//       stdio: 'inherit'
//     }).once('close', () => {
//       server.close();
//     });
//   });
// }

const protractor2 = new Protractor();

const configPath = path.join(__dirname, 'protractor.chrome.js');
protractor2.server(8080, './dist').then(server => {

  const child = child_process.spawn(path.resolve(getProtractorDir() + '/protractor' + winExt), [configPath], {
    stdio: 'inherit',
    env: process.env
  }).on('exit', function (code) {
    if (child) {
      child.kill();
    }
    server.close();
  });
});
