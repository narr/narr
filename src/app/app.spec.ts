import {
  afterEach,
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  inject,
  injectAsync,
  it
} from '@angular/core/testing';
// import { TestComponentBuilder } from '@angular/compiler/testing';

import { AppComponent } from './app.component';

describe('App', () => {
  beforeEachProviders(() => [
    AppComponent
  ]);

  it('should have a name', inject([AppComponent], app => {
    expect(app._name).toEqual('Narr');
  }));
});
