// https://webpack.github.io/docs/loaders.html#writing-a-loader
// http://stackoverflow.com/questions/35479987/query-not-found-for-webpack-custom-loader

// don't change to ES6's arrow function because of 'this' context
module.exports = function (source) {
  let rtn = source;
  this.cacheable();
  // console.log('// ================================');
  // console.log(this._compilation);
  // console.log(this);
  if (this.query.indexOf('name=service-worker') > -1) {
    rtn += `\n// ${Date.now()}`; // to change the hash value of service-worker.js on every build
  } else { // index.html
    if (this.options.metadata.github) {
      rtn = rtn.replace(/\/asset\//g, '/narr/asset/');
    }
  }
  // console.log(rtn);
  return rtn;
};
