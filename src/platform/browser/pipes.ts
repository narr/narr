import { provide, PLATFORM_PIPES } from '@angular/core';

export const APPLICATION_PIPES = [
];

export const PIPES = [
  provide(PLATFORM_PIPES, { useValue: APPLICATION_PIPES, multi: true })
];
