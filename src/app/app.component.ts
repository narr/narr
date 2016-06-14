import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit } from '@angular/core';

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
  sidebarOpen: boolean = false;
  sidebarSlide: boolean = false;
  private hasTouch: boolean;
  private LAST_SCROLL_TOP = 'lastScrollTop';
  private SLIDE_ENABLE_MAX_WIDTH = 800;

  constructor(
    // http://blog.thoughtram.io/angular/2015/09/17/resolve-service-dependencies-in-angular-2.html
    @Inject(Window) private window: Window,
    private elementRef: ElementRef,
    private scrollService: ScrollService
  ) {
    this.hasTouch = this.window && 'ontouchstart' in this.window;
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
    if (this.window && this.window.sessionStorage) {
      let scrollTop = this.window.sessionStorage.getItem(this.LAST_SCROLL_TOP);
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

  @HostListener('window:beforeunload', ['$event'])
  onBeforeunload(e) {
    // console.log(e);
    if (this.window && this.window.sessionStorage) {
      this.window.sessionStorage.setItem(this.LAST_SCROLL_TOP, this.scrollService.getScrollTop()
        .toString());
    }
  };

  @HostListener('click', ['$event'])
  onClick(e) {
    this.sidebarOpen = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(e) {
    // console.log(e);
    this.onScroll(null);
    if (this.window.innerWidth > this.SLIDE_ENABLE_MAX_WIDTH) {
      this.disableSlide();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(e) { // handle scrolling of body or narr-main
    // console.log(e.target);
    this.scrollService.handleScrollChange();
  }

  onTriggerSidebar() {
    this.sidebarSlide = true;
    this.sidebarOpen = !this.sidebarOpen;
  }

  private disableSlide() {
    this.sidebarSlide = false;
    this.sidebarOpen = false;
  }
}
