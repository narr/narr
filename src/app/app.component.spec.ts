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
  let myWindow;
  let scrollService;

  beforeEach(() => {
    myWindow = {};
    scrollService = {};
  });

  beforeEachProviders(() => [
    AppComponent,
    provide(Window, { useValue: myWindow }),
    provide(ElementRef, { useValue: ElementRef }),
    provide(ScrollService, { useValue: scrollService })
  ]);

  it('should close Sidebar when a click happens on App', inject([AppComponent], app => {
    app.sidebarOpen = true;
    app.sidebarSlide = true;
    app.onClick();

    const subject = app.sidebarOpen;
    const subject2 = app.sidebarSlide;
    const result = false;
    const result2 = true;

    expect(subject).toEqual(result);
    expect(subject2).toEqual(result2);
  }));

  it('should close Sidebar when window\'s width is bigger than 800 on resizing',
    inject([AppComponent], app => {
      myWindow['innerWidth'] = 801;
      scrollService.handleScrollChange = f => f;
      app.sidebarOpen = true;
      app.sidebarSlide = true;
      app.onResize();

      const subject = app.sidebarOpen;
      const subject2 = app.sidebarSlide;
      const result = false;
      const result2 = false;

      expect(subject).toEqual(result);
      expect(subject2).toEqual(result2);
    }));

  it('should not close Sidebar when window\'s width is not bigger than 800 on resizing',
    inject([AppComponent], app => {
      myWindow['innerWidth'] = 800;
      scrollService.handleScrollChange = f => f;
      app.sidebarOpen = true;
      app.sidebarSlide = true;
      app.onResize();

      const subject = app.sidebarOpen;
      const subject2 = app.sidebarSlide;
      const result = true;
      const result2 = true;

      expect(subject).toEqual(result);
      expect(subject2).toEqual(result2);
    }));

  it('should trigger Sidebar when onTriggerSidebar is called',
    inject([AppComponent], app => {
      app.sidebarOpen = true;
      app.sidebarSlide = false;
      app.onTriggerSidebar();

      const subject = app.sidebarOpen;
      const subject2 = app.sidebarSlide;
      const result = false;
      const result2 = true;

      expect(subject).toEqual(result);
      expect(subject2).toEqual(result2);

      app.sidebarOpen = false;
      app.sidebarSlide = true;
      app.onTriggerSidebar();

      const subject3 = app.sidebarOpen;
      const subject4 = app.sidebarSlide;
      const result3 = true;
      const result4 = true;

      expect(subject3).toEqual(result3);
      expect(subject4).toEqual(result4);
    }));
});
