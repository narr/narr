import { PLATFORM_DIRECTIVES, provide } from '@angular/core';

export const APPLICATION_DIRECTIVES = [];

export const DIRECTIVES = [
  // multi: true
  // http://blog.thoughtram.io/angular2/2015/11/23/multi-providers-in-angular-2.html
  provide(PLATFORM_DIRECTIVES, { useValue: APPLICATION_DIRECTIVES, multi: true })
];
