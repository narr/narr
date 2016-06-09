import {
  AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Output
} from '@angular/core';

import { AboutComponent } from './about';
import { ContactComponent } from './contact';
import { IntroComponent } from './intro';
import { ScrollService } from '../shared'; // from parent
import { TimelineComponent } from './timeline';

@Component({
  selector: 'narr-main',
  template: require('./main.component.html'),
  styles: [require('./main.component.scss').toString()],
  directives: [
    AboutComponent, ContactComponent, IntroComponent, TimelineComponent
  ]
})
export class MainComponent implements AfterViewInit {
  @Output() disableSlide = new EventEmitter();
  private lastScrollTop: number;
  private SLIDE_ENABLE_MAX_WIDTH = 800;

  constructor(
    private elementRef: ElementRef,
    private scrollService: ScrollService
  ) {
    scrollService.setScrollTarget(elementRef.nativeElement);
  }

  ngAfterViewInit() { // to scroll after views are all rendered
    // http://www.w3schools.com/html/html5_webstorage.asp
    if (window && window.sessionStorage) {
      let scrollTop = window.sessionStorage.getItem('lastScrollTop');
      if (scrollTop !== null) {
        scrollTop *= 1; // convert to number
        // console.log(scrollTop);
        this.elementRef.nativeElement.scrollTop = scrollTop;
      }
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  private onBeforeunload(e) {
    // console.log(e);
    if (window && window.sessionStorage && this.lastScrollTop !== undefined) {
      window.sessionStorage.setItem('lastScrollTop', this.lastScrollTop.toString());
    }
  };

  @HostListener('window:resize', ['$event'])
  private onResize(e) {
    // console.log(e);
    this.setScrollTop();
    if (window.innerWidth > this.SLIDE_ENABLE_MAX_WIDTH) {
      this.disableSlide.emit(null);
    }
  }

  @HostListener('scroll', ['$event'])
  private onScroll(e) {
    this.setScrollTop();
  }

  private setScrollTop() {
    // console.log(scrollTop);
    this.lastScrollTop = this.elementRef.nativeElement.scrollTop;
    this.scrollService.onScroll();
  }
}
