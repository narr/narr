import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ScrollService } from '../shared'; // from parent
import { SkillsModel } from './skills.model';
import { SkillService } from './skill.service';

@Component({
  selector: 'narr-about',
  template: require('./about.component.html'),
  providers: [SkillService]
})
export class AboutComponent implements AfterViewInit, OnDestroy, OnInit {
  private aboutMeScrolled: { el: any, scrolled: boolean };
  private aboutSkillsScrolled: Array<{ el: any, scrolled: boolean }> = [];
  private aboutSkillScrolledIdxs: Array<number> = [];
  // http://stackoverflow.com/questions/32693061/angular-2-typescript-get-hold-of-an-element-in-the-template
  // no spaces after a comma in rc.1
  @ViewChildren('scrollTarget') private scrollEventTargetQl: QueryList<ElementRef>;
  private skills: SkillsModel[];
  private subscription: Subscription;

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private elementRef: ElementRef,
    private scrollService: ScrollService,
    private skillService: SkillService
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
    // sorted by the DOM tree structure
    this.scrollEventTargetQl.forEach(item => {
      const el = item.nativeElement;
      if (el.classList.contains('about-me')) {
        this.aboutMeScrolled = {
          el, scrolled: false
        };
      } else {
        this.aboutSkillsScrolled.push({
          el, scrolled: false
        });
        this.aboutSkillScrolledIdxs.push(i++);
      }
    });
    // console.log(this.aboutSkillScrolledIdxs);
    // TODO: https://github.com/angular/angular/issues/6005
    this.changeDetectionRef.detectChanges();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.skills = this.skillService.getSkills();
  }

  private handleScrollE(viewPort: { top: number, bottom: number }) {
    // http://www.w3schools.com/jsref/prop_element_offsettop.asp
    const aboutMe = this.aboutMeScrolled;
    if (!aboutMe.scrolled) {
      const aboutMeArea = {
        top: aboutMe.el.offsetTop, bottom: aboutMe.el.offsetTop + aboutMe.el.offsetHeight
      };
      if (this.scrollService.hasShareArea(viewPort, aboutMeArea)) {
        aboutMe.scrolled = true;
      }
    }

    const skillIdxs = this.aboutSkillScrolledIdxs;
    if (skillIdxs.length > 0) {
      const skills = this.aboutSkillsScrolled;
      const firstSkill = skills[skillIdxs[0]].el;
      const lastSkill = skills[skillIdxs[skillIdxs.length - 1]].el;

      if (firstSkill.offsetTop < viewPort.bottom &&
        viewPort.top < lastSkill.offsetTop + lastSkill.offsetHeight) {
        for (let i = skillIdxs.length - 1; i > -1; i--) {
          const skill = skills[skillIdxs[i]];
          const skillArea = {
            top: skill.el.offsetTop, bottom: skill.el.offsetTop + skill.el.offsetHeight
          };
          if (this.scrollService.hasShareArea(viewPort, skillArea)) {
            skill.scrolled = true;
            skillIdxs.splice(i, 1);
          }
        }
      }
    }

    if (aboutMe.scrolled && skillIdxs.length < 1) {
      this.subscription.unsubscribe();
    }
  }
}
