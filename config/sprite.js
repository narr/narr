// To copy sprite icon images after the process of imaging is done
// As it is not ready to be copied, when it is imported by 'SCSS' and be handled by 'file-loader'
// in webpack

const helpers = require('./helpers');
const copy = require('copy');

const defaultSrc = helpers.root('temp/icon/sprite/*.png');
const IS_FOR_GITHUB_PAGE = helpers.hasProcessFlag('-my-ghp');
const defaultDest = IS_FOR_GITHUB_PAGE ? helpers.root('gh-pages/asset/img/ic') :
  helpers.root('dist/asset/img/ic');

function copySprite(src = defaultSrc, dest = defaultDest) {
  copy(src, dest, (err, file) => {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = () => {
  copySprite
};

// http://justindavis.co/2014/11/16/running-node-modules-from-the-command-line/
if (!module.parent) {
  // console.log(IS_FOR_GITHUB_PAGE);
  copySprite();
}
