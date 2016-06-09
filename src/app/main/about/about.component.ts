import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ScrollService } from '../../shared';
import { SkillGroup } from './skill-group.model';
import { SkillGroupService } from './skill-group.service';

@Component({
  selector: 'narr-about',
  template: require('./about.component.html'),
  providers: [SkillGroupService]
})
export class AboutComponent implements AfterViewInit, OnInit {
  private contentScrolled: { el: any, scrolled: boolean };
  @ViewChildren('scrollTarget') private scrollEventTargetQl: QueryList<ElementRef>;
  private skillGroups: SkillGroup[];
  private skillGroupScrolleds: Array<{ el: any, scrolled: boolean }> = [];
  private skillGroupScrolledIdxs: Array<number> = [];
  private subscription: Subscription;

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private elementRef: ElementRef,
    private scrollService: ScrollService,
    private skillGroupService: SkillGroupService
  ) {
    this.subscription = scrollService.getObservable().
      subscribe(({ viewPort, scrollTargets }) => {
        // console.log(scrollTargets);
        if (scrollTargets[elementRef.nativeElement.tagName]) {
          this.handleScrollE(viewPort);
        }
      });
  }

  ngAfterViewInit() {
    let i = 0;
    let el;
    // sorted by the DOM tree structure
    this.scrollEventTargetQl.forEach(item => {
      el = item.nativeElement;
      if (el.classList.contains('content')) {
        this.contentScrolled = {
          el, scrolled: false
        };
      } else {
        this.skillGroupScrolleds.push({
          el, scrolled: false
        });
        this.skillGroupScrolledIdxs.push(i++);
      }
    });
    // console.log(this.aboutSkillScrolledIdxs);
    // TODO: https://github.com/angular/angular/issues/6005
    this.changeDetectionRef.detectChanges();
  }

  // ngOnDestroy() {
  // no need this because this component's life cycle is the same with App component
  //   this.subscription.unsubscribe();
  // }

  ngOnInit() {
    this.skillGroups = this.skillGroupService.getSkillGroups();
  }

  private handleScrollE(viewPort: { top: number, bottom: number }) {
    // http://www.w3schools.com/jsref/prop_element_offsettop.asp
    const content = this.contentScrolled;
    if (!content.scrolled) {
      const contentEl = content.el;
      const contentArea = {
        top: contentEl.offsetTop, bottom: contentEl.offsetTop + contentEl.offsetHeight
      };
      if (this.scrollService.hasShareArea(viewPort, contentArea)) {
        content.scrolled = true;
      }
    }

    const skillGroupIdxs = this.skillGroupScrolledIdxs;
    if (skillGroupIdxs.length > 0) {
      const skillGroups = this.skillGroupScrolleds;
      const firstSkillGroup = skillGroups[skillGroupIdxs[0]].el;
      const lastSkillGroup = skillGroups[skillGroupIdxs[skillGroupIdxs.length - 1]].el;

      if (firstSkillGroup.offsetTop < viewPort.bottom &&
        viewPort.top < lastSkillGroup.offsetTop + lastSkillGroup.offsetHeight) {
        let skillGroup;
        let skillGroupEl;
        let top;
        let skillGroupArea;
        for (let i = skillGroupIdxs.length - 1; i > -1; i--) {
          skillGroup = skillGroups[skillGroupIdxs[i]];
          skillGroupEl = skillGroup.el;
          top =  skillGroupEl.offsetTop;
          skillGroupArea = {
            top, bottom: top + skillGroupEl.offsetHeight
          };
          if (this.scrollService.hasShareArea(viewPort, skillGroupArea)) {
            skillGroup.scrolled = true;
            skillGroupIdxs.splice(i, 1);
          }
        }
      }
    }

    if (content.scrolled && skillGroupIdxs.length < 1) {
      this.subscription.unsubscribe();
    }
  }
}
