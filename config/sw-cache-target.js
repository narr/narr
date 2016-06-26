// relative to output path

module.exports = {
  include: {
    '/': true,
  },
  exclude: {
    'asset/img/ic/ic.favicon.ico': true,
    'manifest.json': true,
    'service-worker.js': true,
    'js/main.bundle.js.map': true,
    'css/main.bundle.css.map': true,
    'js/polyfills.bundle.js.map': true,
    'js/vendor.bundle.js.map': true,
    'css/vendor.bundle.css.map': true
  }
};

// const target = {
//   '/': true,
//   '/index.html': true,

//   '/css/vendor.bundle.css': true,
//   '/css/main.bundle.css': true,

//   '/js/polyfills.bundle.js': true,
//   '/js/vendor.bundle.js': true,

//   '/asset/img/bg.jpg': true,
//   '/asset/font/fontawesome-webfont.woff2': true,

//   '/asset/img/ic/angular.png': true,

//   '/asset/img/ic/ics-skill-language.png': true,
//   '/asset/img/ic/ics-skill-framework&library.png': true,
//   '/asset/img/ic/ics-skill-etc.png': true,

//   '/asset/img/ic/ic.narr.128x128.png': true,
//   '/asset/img/ic/ic.narr.144x144.png': true,
//   '/asset/img/ic/ic.narr.152x152.png': true,
//   '/asset/img/ic/ic.narr.192x192.png': true,
//   '/asset/img/ic/ic.narr.256x256.png': true,

//   '/asset/img/event.github.jpg': true,
//   '/asset/img/event.innorix.jpg': true,
//   '/asset/img/event.usoftation.jpg': true,
//   '/asset/img/event.cps-telecom.jpg': true
// };
