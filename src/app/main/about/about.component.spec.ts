import {
  beforeEachProviders,
  describe,
  expect,
  inject,
  it
} from '@angular/core/testing';
import { ChangeDetectorRef, ElementRef, provide } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { AboutComponent } from './about.component';
import { ScrollService } from '../../shared';
import { SkillGroupService } from './skill-group.service';

describe('AboutComponent', () => {
  const changeDetectorRef = {
    detectChanges: f => f
  };
  const elementRef = {
    nativeElement: {
      tagName: 'NARR-ABOUT'
    }
  };

  const scrollService = new ScrollService(null);
  let scrollSource;
  scrollService.getObservable = () => {
    scrollSource = new Subject();
    return scrollSource.asObservable();
  };

  beforeEachProviders(() => [
    AboutComponent,
    provide(ChangeDetectorRef, { useValue: changeDetectorRef }),
    provide(ElementRef, { useValue: elementRef }),
    provide(ScrollService, { useValue: scrollService }),
    // provide(ScrollService, { useClass: ScrollService }),
    // provide(SkillGroupService, { useValue: new SkillGroupService() })
    provide(SkillGroupService, { useClass: SkillGroupService })
  ]);

  it('should handle a scroll event', inject([AboutComponent], about => {
    about.scrollEventTargetQl = [
      {
        nativeElement: {
          offsetTop: 200,
          offsetHeight: 400,
          classList: {
            contains: () => true
          }
        }
      }
    ];

    about.ngOnInit();
    const groups = about.skillGroups;
    const offsetTop = [200, 400, 600];
    for (let i = 0, len = groups.length; i < len; i++) {
      about.scrollEventTargetQl.push({
        nativeElement: {
          offsetTop: offsetTop[i],
          offsetHeight: 200,
          classList: {
            contains: () => false
          }
        }
      });
    }

    about.ngAfterViewInit();

    scrollSource.next({
      viewPort: {
        top: 200,
        bottom: 600
      },
      scrollTargets: {
        'NARR-ABOUT': true
      }
    });

    const subject = about.contentScrolled.scrolled;
    const subject2 = about.skillGroupScrolleds[0].scrolled;
    const subject3 = about.skillGroupScrolleds[1].scrolled;
    const subject4 = about.skillGroupScrolleds[2].scrolled;

    const result = true;
    const result2 = true;
    const result3 = true;
    const result4 = false;

    expect(subject).toEqual(result);
    expect(subject2).toEqual(result2);
    expect(subject3).toEqual(result3);
    expect(subject4).toEqual(result4);
  }));

  it('should stop handling a scroll event after all elements are scrolled',
    inject([AboutComponent], about => {
      about.scrollEventTargetQl = [
        {
          nativeElement: {
            offsetTop: 300,
            offsetHeight: 300,
            classList: {
              contains: () => true
            }
          }
        }
      ];

      about.ngOnInit();
      const groups = about.skillGroups;
      const offsetTop = [200, 400, 500];
      for (let i = 0, len = groups.length; i < len; i++) {
        about.scrollEventTargetQl.push({
          nativeElement: {
            offsetTop: offsetTop[i],
            offsetHeight: 150,
            classList: {
              contains: () => false
            }
          }
        });
      }

      about.ngAfterViewInit();

      scrollSource.next({
        viewPort: {
          top: 100,
          bottom: 700
        },
        scrollTargets: {
          'NARR-ABOUT': true
        }
      });

      const subject = about.contentScrolled.scrolled;
      const subject2 = about.skillGroupScrolleds[0].scrolled;
      const subject3 = about.skillGroupScrolleds[1].scrolled;
      const subject4 = about.skillGroupScrolleds[2].scrolled;
      const subject5 = about.subscription.isUnsubscribed;

      const result = true;
      const result2 = true;
      const result3 = true;
      const result4 = true;
      const result5 = true;

      expect(subject).toEqual(result);
      expect(subject2).toEqual(result2);
      expect(subject3).toEqual(result3);
      expect(subject4).toEqual(result4);
      expect(subject5).toEqual(result5);
    }));
});
