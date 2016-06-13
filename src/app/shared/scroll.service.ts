import { Inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { EasingService } from '../../lib';

/**
 * Use this to do something with Main component's scrollTop
 */
@Injectable()
export class ScrollService {
  private doc = document;
  private easingService = new EasingService();
  private scroll$: Observable<{ viewPort: { top: number, bottom: number }, scrollTargets: {} }>;
  private scrollSrc;
  private scrollSource = new Subject();
  private scrollTarget;
  private scrollToForced: boolean;
  private scrollToRafId;
  private scrollToTimeoutId;

  constructor() {
    this.scroll$ = this.scrollSource.asObservable()
      // https://github.com/ReactiveX/rxjs/blob/master/src/operator/throttleTime.ts
      .throttleTime(100) // ms
      // https://github.com/ReactiveX/rxjs/blob/master/src/operator/delay.ts
      // to catch the last scrollTop when scrolling fast(e.g. scroll by KB shortcut) and
      // this is used to get the current category of sidebar
      .delay(100)
      .map(() => {
        const scrollTop = this.getScrollTop();
        const viewPort = {
          top: scrollTop,
          bottom: scrollTop + this.getSrcHeihgt()
        };
        const scrollTargets = this.getScrollTargets(viewPort);
        // console.log(scrollTop);
        return {
          viewPort, scrollTargets
        };
      });
  }

  handleScrollChange() {
    // console.log('scrolled');
    if (!this.scrollToForced) { // block the scroll event while scrollTo is forced
      this.scrollSource.next(null);
    }
  }

  hasShareArea(a: { top: number, bottom: number },
    b: { top: number, bottom: number }): boolean {
    let rtn = false;
    if (a.top < b.top) {
      if (a.bottom > b.top) {
        rtn = true;
      }
    } else if (a.top === b.top) {
      rtn = true;
    } else {
      if (a.top < b.bottom) {
        rtn = true;
      }
    }
    return rtn;
  }

  getObservable() {
    return this.scroll$;
  }

  getScrollTop(): number {
    let top;
    if (this.scrollSrc) {
      top = this.scrollSrc.scrollTop;
    } else {
      top = this.doc.documentElement.scrollTop || this.doc.body.scrollTop;
    }
    return top;
  }

  scrollTo(childTagName: string, delay: number = 0) {
    clearTimeout(this.scrollToTimeoutId);
    this.scrollToTimeoutId = setTimeout(() => {
      const scrollTop = this.getChildOffsetTop(childTagName);
      this.scroll(scrollTop);
    }, delay);
  }

  setScrollSrcTarget(src, target) {
    this.scrollSrc = src;
    this.scrollTarget = target;
  }

  setScrollTop(top) {
    if (this.scrollSrc) {
      this.scrollSrc.scrollTop = top;
    } else {
      this.doc.documentElement.scrollTop = top;
      this.doc.body.scrollTop = top;
    }
  }

  private getChildOffsetTop(childTagName: string): number {
    const children = this.scrollTarget.children;
    for (let child of children) {
      // console.log(childTagName);
      if (child.tagName === childTagName) {
        return child.offsetTop;
      }
    }
  }

  private getScrollTargets(viewPort) {
    const children = this.scrollTarget.children;
    let targets = {};
    let top;
    let bottom;
    let childArea = { top: undefined, bottom: undefined };
    for (let child of children) {
      top = child.offsetTop;
      if (child.nextElementSibling) {
        bottom = child.nextElementSibling.offsetTop;
      } else {
        bottom = top + child.offsetHeight;
      }
      childArea.top = top;
      childArea.bottom = bottom;
      if (this.hasShareArea(viewPort, childArea)) {
        targets[child.tagName] = true;
      }
    }
    return targets;
  }

  private getSrcHeihgt(): number {
    let height;
    if (this.scrollSrc) {
      height = this.scrollSrc.offsetHeight;
    } else {
      height = this.doc.body.offsetHeight;
    }
    return height;
  }

  private scroll(endScrollTop: number) {
    const startScrollTop = this.getScrollTop();
    const diffrence = endScrollTop - startScrollTop;

    if (-100 < diffrence && diffrence < 100 && diffrence !== 0) {
      this.setScrollTop(endScrollTop);
    } else {
      const startTime = Date.now();
      const DURATION = 1000;

      // rAF helps you get the ultimate 60 fps that is ideal,
      // and 60 fps translates to 16.7ms per frame.
      window.cancelAnimationFrame(this.scrollToRafId);
      this.scrollToRafId = window.requestAnimationFrame(timestamp => {
        this.scrollStep(timestamp, {
          endScrollTop, startTime, startScrollTop, diffrence, duration: DURATION
        });
      });
    }
  }

  private scrollStep(timestamp: number, { endScrollTop, startTime, startScrollTop, diffrence,
    duration }: {
      endScrollTop: number, startTime: number, startScrollTop: number, diffrence: number,
      duration: number
    }) {
    this.scrollToForced = true;
    const elapsed = Date.now() - startTime;
    if (elapsed > duration) {
      this.scrollToForced = false;
      this.setScrollTop(endScrollTop);
      // The last event would not be fired if prev events' scrollTop are
      // the same(or almost the same). So emit it explicitly
      this.handleScrollChange();
    } else {
      // const value = this.easingService.linear(elapsed, startScrollTop, diffrence, duration);
      const value = this.easingService.easeOutQuad(elapsed, startScrollTop, diffrence, duration);
      this.setScrollTop(value);
      this.scrollToRafId = window.requestAnimationFrame(timestamp => {
        this.scrollStep(timestamp, {
          endScrollTop, startTime, startScrollTop, diffrence, duration
        });
      });
    }
  }
}
