import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

import { NavComponent } from './nav';
// to avoid a conflic between ./main.ts and ./main/index.ts, add index after main folder
import { MainComponent } from './main/index';
import { SidebarComponent } from './sidebar';

@Component({
  selector: 'narr-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.scss').toString()],
  directives: [NavComponent, MainComponent, SidebarComponent]
})
export class AppComponent implements OnInit {
  private activeEl: string;
  private mainEl;
  private tagNameRegex = /narr-(.*?)$/i;

  constructor(private appRef: ElementRef) { }

  ngOnInit() {
    if (window && 'ontouchstart' in window) {
      this.appRef.nativeElement.classList.add('touch');
    }
    this.mainEl = this.appRef.nativeElement.children[2]; // narr-main
  }

  @HostListener('window:scroll', ['$event'])
  private onScroll(e) {
    console.log(e);
    this.setActiveArea(e.target.body.scrollTop);
  }

  private setActiveArea(scrollTop: number) {
    // console.log(scrollTop);
    const children = this.mainEl.children;
    let maxHeight = 0;
    for (let child of children) {
      if (scrollTop < maxHeight + child.offsetHeight + 1) {
        // replace child with the second-to-last child(no link for footer)
        if (child === children[children.length - 1]) {
          child = children[children.length - 2];
        }
        const matchRst: string[] = child.tagName.match(this.tagNameRegex);
        this.activeEl = matchRst !== null ? matchRst[1].toLowerCase() : '';
        break;
      } else {
        maxHeight += child.offsetHeight;
      }
    }
    // console.log(this.activeEl);
  }
}
// comment this out to persist scroll position after refresh
