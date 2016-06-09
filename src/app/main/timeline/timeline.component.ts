import {
  AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ScrollService } from '../../shared';
import { Timeline } from './timeline.model';
import { TimelineService } from './timeline.service';

@Component({
  selector: 'narr-timeline',
  template: require('./timeline.component.html'),
  providers: [TimelineService]
})
export class TimelineComponent implements AfterViewInit, OnInit {
  private baseOffsetEl;
  private currentYear = new Date().getFullYear();
  private events: Timeline[];
  private eventScrolleds: Array<{ el: any, scrolled: boolean }> = [];
  private eventScrolledIdxs: Array<number> = [];
  // http://stackoverflow.com/questions/32693061/angular-2-typescript-get-hold-of-an-element-in-the-template
  // no spaces after a comma in rc.1
  @ViewChildren('baseOffsetTarget,scrollTarget')
  private scrollEventTargetQl: QueryList<ElementRef>;
  private subscription: Subscription;

  constructor(
    private elementRef: ElementRef,
    private scrollService: ScrollService,
    private timelineService: TimelineService
  ) {
    this.subscription = scrollService.getObservable().
      subscribe(({ viewPort, scrollTargets }) => {
        // console.log(viewPort.top);
        if (scrollTargets[elementRef.nativeElement.tagName]) {
          this.handleScrollE(viewPort);
        }
      });
  }

  ngAfterViewInit() {
    let i = 0;
    let el;
    this.scrollEventTargetQl.forEach(item => {
      el = item.nativeElement;
      if (el.tagName === 'UL') {
        this.baseOffsetEl = el
      } else {
        this.eventScrolleds.push({
          el, scrolled: false
        });
        this.eventScrolledIdxs.push(i++);
      }
    });
    // console.log(this.eventsScrolled);
  }

  ngOnInit() {
    this.events = this.timelineService.getEvents();
  }

  private handleScrollE(viewPort: { top: number, bottom: number }) {
    const baseOffsetTop = this.baseOffsetEl.offsetTop;
    const events = this.eventScrolleds;
    const eventsIdxs = this.eventScrolledIdxs;
    const firstEl = events[eventsIdxs[0]].el;
    const firstOffsetTop = baseOffsetTop + firstEl.offsetTop;
    const lastEl = events[eventsIdxs[eventsIdxs.length - 1]].el;
    const lastOffsetBottom = baseOffsetTop + lastEl.offsetTop + lastEl.offsetHeight;

    if (firstOffsetTop < viewPort.bottom && viewPort.top < lastOffsetBottom) {
      let event;
      let eventEl;
      let top;
      let eventArea;
      for (let i = eventsIdxs.length - 1; i > -1; i--) {
        event = events[eventsIdxs[i]];
        eventEl = event.el;
        top = baseOffsetTop + eventEl.offsetTop;
        eventArea = {
          top, bottom: top + eventEl.offsetHeight
        };
        if (this.scrollService.hasShareArea(viewPort, eventArea)) {
          event.scrolled = true;
          eventsIdxs.splice(i, 1);
        }
      }
    }

    if (eventsIdxs.length < 1) {
      this.subscription.unsubscribe();
    }
  }
}
