import { Inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { EasingService } from '../../lib';

/**
 * Use this to do something with Main component's scrollTop
 */
@Injectable()
export class ScrollService {
  private easingService = new EasingService();
  private scroll$: Observable<{ viewPort: { top: number, bottom: number }, scrollTargets: {} }>;
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
        const target = this.scrollTarget;
        const scrollTop = target.scrollTop;
        const viewPort = {
          top: scrollTop,
          bottom: scrollTop + target.offsetHeight
        };
        const scrollTargets = this.getScrollTargets(target, viewPort);
        // console.log(val);
        return {
          viewPort, scrollTargets
        };
      });
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

  onScroll() {
    // console.log(this.scrollTarget.scrollTop);
    if (!this.scrollToForced) { // block the scroll event while scrollTo is forced
      this.scrollSource.next(null);
    }
  }

  scrollTo(childTagName: string, delay: number = 0) {
    clearTimeout(this.scrollToTimeoutId);
    this.scrollToTimeoutId = setTimeout(() => {
      const scrollTop = this.getChildOffsetTop(childTagName);
      this.scroll(scrollTop);
    }, delay);
  }

  setScrollTarget(target) {
    this.scrollTarget = target;
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

  private getScrollTargets(parentEl, viewPort) {
    const children = parentEl.children;
    let targets = {};
    let top;
    let bottom;
    let childArea = { top: undefined, bottom: undefined };
    for (let child of children) {
      top = child.offsetTop;
      bottom = top + child.offsetHeight;
      childArea.top = top;
      childArea.bottom = bottom;
      if (this.hasShareArea(viewPort, childArea)) {
        targets[child.tagName] = true;
      }
    }
    return targets;
  }

  private scroll(endScrollTop: number) {
    const target = this.scrollTarget;
    const startScrollTop = target.scrollTop;
    const diffrence = endScrollTop - startScrollTop;

    if (-100 < diffrence && diffrence < 100 && diffrence !== 0) {
      target.scrollTop = endScrollTop;
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
      this.scrollTarget.scrollTop = endScrollTop;
      // The last event would not be fired if prev events' scrollTop are
      // the same(or almost the same). So emit it explicitly
      this.scrollSource.next(null);
    } else {
      const value = this.easingService.easeOutQuad(elapsed, startScrollTop, diffrence, duration);
      this.scrollTarget.scrollTop = value;
      // this.scrollSource.next(null); // don't emit while scrolling for performance
      this.scrollToRafId = window.requestAnimationFrame(timestamp => {
        this.scrollStep(timestamp, {
          endScrollTop, startTime, startScrollTop, diffrence, duration
        });
      });
    }
  }
}
