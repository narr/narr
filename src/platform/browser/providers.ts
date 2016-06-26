import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { provide } from '@angular/core';

export const APPLICATION_PROVIDERS = [
  provide(Window, { useValue: window }),
  disableDeprecatedForms(),
  provideForms()
];

export const PROVIDERS = [
  ...APPLICATION_PROVIDERS
];
