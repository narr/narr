/// <reference path="../typings/index.d.ts" />

interface WebpackRequire {
  ensure(paths: string[], callback: (require: <T>(path: string) => T) => void,
    chunkName?: string): void;
}
interface NodeRequire extends WebpackRequire { }

// @ Webpack DefinePlugin variables
declare var ENV: string;
declare var HMR: boolean;
// Webpack DefinePlugin variables @
