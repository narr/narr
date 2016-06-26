import { disableDeprecatedForms, provideForms } from '@angular/forms';
import {
  // NODE_HTTP_PROVIDERS,
  // NODE_ROUTER_PROVIDERS
  provide
} from 'angular2-universal';

export const APPLICATION_PROVIDERS = [
  // ...NODE_HTTP_PROVIDERS,
  // ...NODE_ROUTER_PROVIDERS,
  provide(Window, { useValue: {} }),
  disableDeprecatedForms(),
  provideForms()
];

export const PROVIDERS = [
  ...APPLICATION_PROVIDERS
];
