import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ScrollService {
  private scroll$: Observable<{ viewPort: { top: number, bottom: number }, scrollTargets: {} }>;
  private scrollSource = new Subject<any>();

  constructor() {
    this.scroll$ = this.scrollSource.asObservable()
      // https://github.com/ReactiveX/rxjs/blob/master/src/operator/throttleTime.ts
      .throttleTime(100) // ms
      .map(val => {
        const scrollTop = val.scrollTop;
        const target = val.event.target;
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

  // emit scrollTop to get the exact scrollTop
  // otherwise the scrollTop values become the same after debounceTime
  onScroll(val: { event: any, scrollTop: number }) {
    this.scrollSource.next(val);
  }

  private getScrollTargets(parentEl, viewPort): {} {
    const children = parentEl.children;
    let targets = {};
    for (let child of children) {
      const top = child.offsetTop;
      const bottom = top + child.offsetHeight;
      const childArea = {
        top, bottom
      }
      if (this.hasShareArea(viewPort, childArea)) {
        targets[child.tagName] = true;
      }
    }
    return targets;
  }
}
