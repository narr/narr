import {
  // NODE_HTTP_PROVIDERS,
  // NODE_ROUTER_PROVIDERS
  provide
} from 'angular2-universal';

export const APPLICATION_PROVIDERS = [
  // ...NODE_HTTP_PROVIDERS,
  // ...NODE_ROUTER_PROVIDERS,
  provide(Window, { useValue: {} })
];

export const PROVIDERS = [
  ...APPLICATION_PROVIDERS
];
