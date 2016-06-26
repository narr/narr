/// <reference path="../typings/index.d.ts" />

interface WebpackRequire {
  ensure(paths: string[], callback: (require: <T>(path: string) => T) => void,
    chunkName?: string): void;
}
interface NodeRequire extends WebpackRequire { }

// @ Webpack DefinePlugin variables
declare var ENV: string;
declare var HMR: boolean;
declare var PROJECT_PATH: string;
declare var BASE_URL: string;
// Webpack DefinePlugin variables @

// @ service-worker
interface ServiceWorker {
  caches: any;
  fetch(request: any): Promise<any>;
  skipWaiting(): Promise<any>;
  clients: {
    claim(): Promise<any>;
  }
  ServiceWorkerRegistration: any;
}
interface ServiceWorkerEvent {
  waitUntil(promise: any): void;
  request: any;
  respondWith(promise: any): void;
}
interface Window extends ServiceWorker { }
interface Event extends ServiceWorkerEvent { }
// service-worker @
