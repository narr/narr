import { Component, ElementRef, Inject } from '@angular/core';

import { ScrollService } from '../shared';

@Component({
  selector: 'narr-sidebar',
  styles: [require('./sidebar.component.scss').toString()],
  template: require('./sidebar.component.html')
})
export class SidebarComponent {
  builtWith = {
    href: 'https://angular.io',
    src: require('asset/img/icon/sprite/skill/framework&library/angular.png'),
    name: 'Angular2'
  };
  categories = [
    'Intro', 'About', 'Timeline', 'Contact'
  ];
  activeTarget = this.categories[0];

  constructor(
    @Inject(Window) private window: Window,
    private elementRef: ElementRef,
    private scrollService: ScrollService
  ) {
    scrollService.getObservable().subscribe(({ viewPort, scrollTargets }) => {
      // console.log(scrollTargets);
      this.activeTarget = this.handleScroll(scrollTargets);
    });
  }

  goto(e) {
    e.preventDefault();
    const style = this.window.getComputedStyle(this.elementRef.nativeElement);
    // console.log(style);
    let delay = 0;
    if (style.transform !== 'none') {
      const DURATION_OF_SIDEBAR_ANI = 300; // ms
      const WAITING_TIME = 200; // 200 is a waiting time till scrollTo starts
      delay = DURATION_OF_SIDEBAR_ANI + WAITING_TIME;
    }
    const src = e.target;
    // console.log(src);
    let target;
    if (src.children.length > 0) { // li
      target = src.children[0];
    } else { // a
      target = src;
    }
    const name = target.hash.substring(1); // remove #
    // console.log(name);
    this.scrollService.scrollTo('NARR-' + name.toUpperCase(), delay);
  }

  reload(e) {
    e.preventDefault();
    this.window.location.reload();
  }

  private handleScroll(targets): string {
    let tagName;
    for (let val of this.categories) {
      tagName = 'NARR-' + val.toUpperCase();
      // console.log(tagName);
      if (targets[tagName]) {
        return val;
      }
    }
  }
}
