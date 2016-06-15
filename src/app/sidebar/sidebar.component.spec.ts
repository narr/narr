import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  inject,
  it
} from '@angular/core/testing';
import { ElementRef, provide } from '@angular/core';

import { SidebarComponent } from './sidebar.component';
import { ScrollService } from '../shared';

describe('SidebarComponent', () => {
  let myWindow;
  let scrollService;
  let scrollServiceCallback: (params: { viewPort: any, scrollTargets: {} }) => void;

  beforeEach(() => {
    myWindow = {};
    scrollService = {};
    scrollService.getObservable = () => {
      return {
        subscribe: f => scrollServiceCallback = f
      };
    };
  });

  beforeEachProviders(() => [
    SidebarComponent,
    provide(Window, { useValue: myWindow }),
    provide(ElementRef, { useValue: ElementRef }),
    provide(ScrollService, { useValue: scrollService })
  ]);

  it('should get the hightest category as a current category among tagets while scrolling',
    inject([SidebarComponent], sidebar => {
      scrollServiceCallback({
        viewPort: null,
        scrollTargets: {
          'NARR-TIMELINE': true,
          'NARR-CONTACT': true
        }
      });

      const subject = sidebar.activeTarget;
      const result = 'Timeline';
      expect(subject).toEqual(result);
    }));

  it('should scroll to a target with a delay', inject([SidebarComponent], sidebar => {
    const event = {
      preventDefault: f => f,
      target: {
        children: [{
          name: 'a',
          hash: '#about'
        }]
      }
    };

    myWindow.getComputedStyle = () => ({
      transform: true
    });

    scrollService.scrollTo = (target, delay) => {
      const subject = target;
      const subject2 = delay;
      const result = 'NARR-ABOUT';
      const result2 = 500;

      expect(subject).toEqual(result);
      expect(subject2).toEqual(result2);
    };

    sidebar.goto(event);
  }));

  it('should scroll to a target without a delay', inject([SidebarComponent], sidebar => {
    const event = {
      preventDefault: f => f,
      target: {
        children: [],
        name: 'a',
        hash: '#contact'
      }
    };

    myWindow.getComputedStyle = () => ({
      transform: 'none'
    });

    scrollService.scrollTo = (target, delay) => {
      const subject = target;
      const subject2 = delay;
      const result = 'NARR-CONTACT';
      const result2 = 0;

      expect(subject).toEqual(result);
      expect(subject2).toEqual(result2);
    };

    sidebar.goto(event);
  }));
});
