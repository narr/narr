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
import { ElementRef, provide } from '@angular/core';

import { AppComponent } from './app.component';

describe('App', () => {
  beforeEachProviders(() => [
    AppComponent,
    provide(ElementRef, { useValue: ElementRef })
  ]);

  it('should have a Regex for Tag name', inject([AppComponent], app => {
    const subject = app.tagNameRegex;
    const result = /narr-(.*?)$/i;

    expect(subject).toEqual(result);
  }));
});
