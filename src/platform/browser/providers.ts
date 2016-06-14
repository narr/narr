import { provide } from '@angular/core';

export const APPLICATION_PROVIDERS = [
  provide(Window, { useValue: window })
];

export const PROVIDERS = [
  ...APPLICATION_PROVIDERS
];
