const path = require('path');
const _root = path.resolve(__dirname, '..');
// console.log('root directory:', root());

function hasProcessFlag(flag) {
  // console.log(process.argv.join(' '));
  return process.argv.join('').indexOf(flag) > -1;
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

function reverse(arr) {
  return [...arr].reverse();
}

function packageSort(packages) {
  // packages = ['polyfills', 'vendor', 'main']
  const len = packages.length - 1;
  const first = packages[0];
  const last = packages[len];
  return function sort(a, b) {
    // polyfills always first
    if (a.names[0] === first) {
      return -1;
    }
    // main always last
    if (a.names[0] === last) {
      return 1;
    }
    // vendor before app
    if (a.names[0] !== first && b.names[0] === last) {
      return -1;
    } else {
      return 1;
    }
  }
}

exports.hasProcessFlag = hasProcessFlag;
exports.root = root;
exports.reverse = reverse;
exports.packageSort = packageSort;
