// RxJS
// v4: https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/categories.md
// v5: https://github.com/ReactiveX/rxjs
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/bufferCount';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/throttleTime';
// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/mergeMap'; // flatMap
// import 'rxjs/add/operator/switchMap'; // flatMapLatest


// Angular 2
import '@angular/platform-browser-dynamic';
import '@angular/core';


// Angular2 HMR
if ('development' === ENV && HMR === true) {
  require('angular2-hmr');
}
