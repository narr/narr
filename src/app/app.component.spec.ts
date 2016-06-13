import {
  afterEach,
  async,
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  inject,
  it
} from '@angular/core/testing';
// import { TestComponentBuilder } from '@angular/compiler/testing';
import { ElementRef, provide } from '@angular/core';

import { AppComponent } from './app.component';
import { ScrollService } from './shared';

describe('App', () => {
  beforeEachProviders(() => [
    AppComponent,
    provide(ElementRef, { useValue: ElementRef }),
    provide(ScrollService, { useValue: ScrollService })
  ]);

  it('should have Sidebar\'s status false at first', inject([AppComponent], app => {
    const subject = app.sidebarOpen;
    const subject2 = app.sidebarSlide;
    const result = false;

    expect(subject).toEqual(result);
    expect(subject2).toEqual(result);
  }));
});
