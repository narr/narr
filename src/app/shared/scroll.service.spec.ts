import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  fakeAsync,
  inject,
  it,
  tick
} from '@angular/core/testing';
import { provide } from '@angular/core';

import { ScrollService } from './scroll.service';

describe('ScrollService', () => {
  const WIN_DEFAULT_SCROLL_TOP = 400;
  let win;

  beforeEach(() => {
    win = {
      document: {
        documentElement: {
          scrollTop: 0
        },
        body: {
          scrollTop: WIN_DEFAULT_SCROLL_TOP
        }
      },
      cancelAnimationFrame: f => f,
      requestAnimationFrame: f => {
        f();
      }
    };
  });

  beforeEachProviders(() => [
    ScrollService,
    provide(Window, {
      useValue: win
    })
  ]);

  it('should have a shared area', inject([ScrollService], (scroll) => {
    const a = { top: 200, bottom: 300 };
    const b = { top: 200, bottom: 300 };
    const subject = scroll.hasShareArea(a, b);
    const result = true;
    expect(subject).toEqual(result);
  }));

  it('should not scroll to a target if the target is the same with current scrollTop',
    fakeAsync(inject([ScrollService], (scroll) => {
      const tagName = 'TEST-TAG';
      const offsetTop = 480;
      const delay = 0;

      scroll.setScrollSrcTarget(null, {
        children: [{ tagName, offsetTop }]
      });
      scroll.window.document.body.scrollTop = offsetTop;

      spyOn(scroll, 'setScrollTop');
      scroll.scrollTo(tagName, delay);
      tick(delay);

      expect(scroll.setScrollTop).not.toHaveBeenCalled();
      const subject = scroll.getScrollTop();
      const result = offsetTop;
      expect(subject).toEqual(result);
    })));

  it('should not animate if diffrence of the target and current scrollTop is less than 100',
    fakeAsync(inject([ScrollService], (scroll) => {
      const tagName = 'TEST-TAG';
      const offsetTop = 480;
      const delay = 50;

      scroll.setScrollSrcTarget(null, {
        children: [{ tagName, offsetTop }]
      });
      const currentOffsetTop = offsetTop + 99
      scroll.window.document.body.scrollTop = currentOffsetTop;

      // http://jasmine.github.io/2.0/introduction.html#section-Spies:_<code>and.callThrough</code>
      spyOn(scroll, 'setScrollTop').and.callThrough();
      scroll.scrollTo(tagName, delay);
      tick(delay);

      expect(scroll.setScrollTop).toHaveBeenCalled();
      const subject = scroll.getScrollTop();
      const result = offsetTop;
      expect(subject).toEqual(result);
    })));

  it('should animate if diffrence of the target and current scrollTop is not less than 100',
    fakeAsync(inject([ScrollService], (scroll) => {
      const tagName = 'TEST-TAG';
      const offsetTop = 450;

      scroll.setScrollSrcTarget(null, {
        children: [{ tagName, offsetTop }]
      });
      const currentOffsetTop = offsetTop - 101
      scroll.window.document.body.scrollTop = currentOffsetTop;

      scroll.SCROLL_ANIMATION_DURATION = 0; // to avoid 'Maximum call stack size exceeded.'
      scroll.scrollTo(tagName);
      tick(0);

      const subject = scroll.getScrollTop();
      const result = offsetTop;
      expect(subject).toEqual(result);
    })));

  it('should get the right scrollTargets on scroll', inject([ScrollService], (scroll) => {
    const child2 = {
      tagName: 'child2',
      offsetTop: 800,
      offsetHeight: 400,
    };
    const child1 = {
      tagName: 'child1',
      nextElementSibling: child2,
      offsetTop: 400
    };
    const child = {
      tagName: 'child',
      nextElementSibling: child1,
      offsetTop: 200
    }

    const scrollTop = 300;
    const offsetHeight = 500;
    scroll.setScrollSrcTarget(
      { scrollTop, offsetHeight },
      { children: [child, child1, child2] });
    const rtnVal = scroll.handleScrollSourceNextE();

    const subject = rtnVal.viewPort;
    const subject2 = rtnVal.scrollTargets['child'];
    const subject3 = rtnVal.scrollTargets['child1'];
    const subject4 = rtnVal.scrollTargets['child2'];

    const result = { top: scrollTop, bottom: scrollTop + offsetHeight };
    const result2 = true;
    const result3 = true;
    const result4 = undefined;

    expect(subject).toEqual(result);
    expect(subject2).toEqual(result2);
    expect(subject3).toEqual(result3);
    expect(subject4).toEqual(result4);
  }));
});
