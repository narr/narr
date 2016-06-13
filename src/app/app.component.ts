import { AfterViewInit, Component, ElementRef, HostListener, OnInit } from '@angular/core';

import { NavbarComponent } from './navbar';
// to avoid a conflict between ./main.ts and ./main/index.ts, add index after main folder
import { MainComponent } from './main/index';
import { SidebarComponent } from './sidebar';
import { ScrollService } from './shared';

@Component({
  selector: 'narr-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.scss').toString()],
  directives: [NavbarComponent, MainComponent, SidebarComponent],
  providers: [ScrollService]
})
export class AppComponent implements AfterViewInit, OnInit {
  private hasTouch: boolean;
  private LAST_SCROLL_TOP = 'lastScrollTop';
  private sidebarOpen: boolean = false;
  private sidebarSlide: boolean = false;
  private SLIDE_ENABLE_MAX_WIDTH = 800;

  constructor(
    private elementRef: ElementRef,
    private scrollService: ScrollService
  ) {
    this.hasTouch = window && 'ontouchstart' in window;
  }

  ngAfterViewInit() { // to scroll after views are all rendered
    // console.log(this.elementRef.nativeElement.lastElementChild); // narr-main
    const mainEl = this.elementRef.nativeElement.lastElementChild;
    if (this.hasTouch) {
      this.scrollService.setScrollSrcTarget(mainEl, mainEl);
    } else {
      this.scrollService.setScrollSrcTarget(null, mainEl);
    }

    // http://www.w3schools.com/html/html5_webstorage.asp
    if (window && window.sessionStorage) {
      let scrollTop = window.sessionStorage.getItem(this.LAST_SCROLL_TOP);
      if (scrollTop !== null) {
        scrollTop *= 1; // convert to number
        // console.log(scrollTop);
        this.scrollService.setScrollTop(scrollTop); // for mobile
      }
    }
  }

  ngOnInit() {
    if (this.hasTouch) {
      document.body.parentElement.classList.add('touch');
    }
    // document.body.parentElement.classList.add('touch'); // to test
  }

  private disableSlide() {
    this.sidebarSlide = false;
    this.sidebarOpen = false;
  }

  @HostListener('window:beforeunload', ['$event'])
  private onBeforeunload(e) {
    // console.log(e);
    if (window && window.sessionStorage) {
      window.sessionStorage.setItem(this.LAST_SCROLL_TOP, this.scrollService.getScrollTop()
        .toString());
    }
  };

  @HostListener('click', ['$event'])
  private onClick(e) {
    this.sidebarOpen = false;
  }

  private onTriggerSidebar() {
    this.sidebarSlide = true;
    this.sidebarOpen = !this.sidebarOpen;
  }

  @HostListener('window:resize', ['$event'])
  private onResize(e) {
    // console.log(e);
    this.onScroll(null);
    if (window.innerWidth > this.SLIDE_ENABLE_MAX_WIDTH) {
      this.disableSlide();
    }
  }

  @HostListener('window:scroll', ['$event'])
  private onScroll(e) { // handle scrolling of body or narr-main
    // console.log(e.target);
    this.scrollService.handleScrollChange();
  }
}
