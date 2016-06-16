import {
  beforeEachProviders,
  describe,
  expect,
  inject,
  it
} from '@angular/core/testing';
import { ElementRef, provide } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { TimelineComponent } from './timeline.component';
import { ScrollService } from '../../shared';
import { TimelineService } from './timeline.service';

describe('TimelineComponent', () => {
  const elementRef = {
    nativeElement: {
      tagName: 'NARR-TIMELINE'
    }
  };

  const scrollService = new ScrollService();
  let scrollSource;
  scrollService.getObservable = () => {
    scrollSource = new Subject();
    return scrollSource.asObservable();
  };

  beforeEachProviders(() => [
    TimelineComponent,
    provide(ElementRef, { useValue: elementRef }),
    provide(ScrollService, { useValue: scrollService }),
    provide(TimelineService, { useClass: TimelineService })
  ]);

  it('should handle a scroll event', inject([TimelineComponent], timeline => {
    timeline.scrollEventTargetQl = [
      {
        nativeElement: {
          offsetTop: 100,
          tagName: 'UL'
        }
      }
    ];

    timeline.ngOnInit();
    const events = timeline.events;
    const offsetTop = [200, 400, 600, 800];
    for (let i = 0, len = events.length; i < len; i++) {
      timeline.scrollEventTargetQl.push({
        nativeElement: {
          offsetTop: offsetTop[i],
          offsetHeight: 200
        }
      });
    }

    timeline.ngAfterViewInit();

    scrollSource.next({
      viewPort: {
        top: 800,
        bottom: 1400
      },
      scrollTargets: {
        'NARR-TIMELINE': true
      }
    });

    const subject = timeline.eventScrolleds[0].scrolled;
    const subject2 = timeline.eventScrolleds[1].scrolled;
    const subject3 = timeline.eventScrolleds[2].scrolled;
    const subject4 = timeline.eventScrolleds[3].scrolled;

    const result = false;
    const result2 = false;
    const result3 = true;
    const result4 = true;

    expect(subject).toEqual(result);
    expect(subject2).toEqual(result2);
    expect(subject3).toEqual(result3);
    expect(subject4).toEqual(result4);
  }));

  it('should stop handling a scroll event after all elements are scrolled',
    inject([TimelineComponent], timeline => {
      timeline.scrollEventTargetQl = [
        {
          nativeElement: {
            offsetTop: 100,
            tagName: 'UL'
          }
        }
      ];

      timeline.ngOnInit();
      const events = timeline.events;
      const offsetTop = [200, 400, 600, 800];
      for (let i = 0, len = events.length; i < len; i++) {
        timeline.scrollEventTargetQl.push({
          nativeElement: {
            offsetTop: offsetTop[i],
            offsetHeight: 200
          }
        });
      }

      timeline.ngAfterViewInit();

      timeline.eventScrolleds[0].scrolled = true;
      timeline.eventScrolledIdxs.splice(0, 1);
      timeline.eventScrolleds[1].scrolled = true;
      timeline.eventScrolledIdxs.splice(0, 1);

      scrollSource.next({
        viewPort: {
          top: 800,
          bottom: 1400
        },
        scrollTargets: {
          'NARR-TIMELINE': true
        }
      });

      const subject = timeline.eventScrolleds[0].scrolled;
      const subject2 = timeline.eventScrolleds[1].scrolled;
      const subject3 = timeline.subscription.isUnsubscribed;

      const result = true;
      const result2 = true;
      const result3 = true;

      expect(subject).toEqual(result);
      expect(subject2).toEqual(result2);
      expect(subject3).toEqual(result3);
    }));
});
