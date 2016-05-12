import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'narr-sidebar',
  styles: [require('./sidebar.component.scss').toString()],
  template: require('./sidebar.component.html')
})
export class SidebarComponent {
  @Output() private closeSidebar = new EventEmitter();
  @Input() private refEl;
  @Input() private sidebarActive: string;
  private thumbnail = require('asset/img/wfp.png');
  private clickTimeoutId;
  private rafId: number;

  private getScrollTop(target: string): number {
    let scrollTop = 0;
    const children = this.refEl.children;
    const patt = new RegExp(target, 'i');
    for (let child of children) {
      if (patt.test(child.tagName)) {
        if (scrollTop !== 0) {
          scrollTop += 1;
        }
        break;
      }
      else {
        scrollTop += child.offsetHeight;
      }
    }
    return scrollTop;
  }

  private onClick(e) {
    const TIMES_OF_SIDEBAR_ANI = 300 + 200; // 200 is delay time
    e.preventDefault();
    this.closeSidebar.emit(null);
    window.clearTimeout(this.clickTimeoutId);
    this.clickTimeoutId = window.setTimeout(() => {
      const scrollTop = this.getScrollTop(e.target.hash.substring(1)); // remove #
      this.scroll(scrollTop);
    }, TIMES_OF_SIDEBAR_ANI);
  }

  private scroll(scrollTo: number) {
    const TIME_PER_FRAME = 16.7; // requestAnimationFrame => 60 FPS
    const DURATION = 300; // ms
    const TIMES_OF_CALL = DURATION / TIME_PER_FRAME;

    const body = window.document.body;
    const progress = (scrollTo - body.scrollTop) / TIMES_OF_CALL;

    function step(timestamp) {
      const nextVal = body.scrollTop + progress;
      if (nextVal === scrollTo || (progress > 0 && nextVal > scrollTo) ||
        (progress < 0 && nextVal < scrollTo)) {
        body.scrollTop = scrollTo;
      } else {
        body.scrollTop = nextVal;
        this.requestId = window.requestAnimationFrame(step);
      }
    }

    if (progress !== 0) {
      // rAF helps you get the ultimate 60 fps that is ideal,
      // and 60 fps translates to 16.7ms per frame.
      window.cancelAnimationFrame(this.rafId);
      this.rafId = window.requestAnimationFrame(step);
    }
  }
}
