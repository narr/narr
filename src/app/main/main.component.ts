import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnInit } from '@angular/core';

import { AboutComponent } from './about';
import { ContactComponent } from './contact';
import { FooterComponent } from './footer';
import { IntroComponent } from './intro';
import { PortfolioComponent } from './portfolio';
import { ScrollService } from './shared';

@Component({
  selector: 'narr-main',
  template: require('./main.component.html'),
  styles: [require('./main.component.scss').toString()],
  directives: [
    AboutComponent, ContactComponent, IntroComponent, PortfolioComponent, FooterComponent
  ],
  providers: [ScrollService]
})
export class MainComponent implements AfterViewInit, OnInit {
  private lastScrollTop: number;

  constructor(
    private elementRef: ElementRef,
    private scrollService: ScrollService
  ) { }

  ngAfterViewInit() {
    // http://www.w3schools.com/html/html5_webstorage.asp
    if (window && window.sessionStorage) {
      let scrollTop = window.sessionStorage.getItem('lastScrollTop');
      if (scrollTop !== null) {
        // console.log(scrollTop);
        scrollTop *= 1; // convert to number
        if (scrollTop !== 0) {
          this.elementRef.nativeElement.scrollTop = scrollTop;
        }
      }
    }
  }

  ngOnInit() { }

  @HostListener('window:beforeunload', ['$event'])
  private onBeforeunload(e) {
    // console.log(e);
    if (window && window.sessionStorage && this.lastScrollTop !== undefined) {
      window.sessionStorage.setItem('lastScrollTop', this.lastScrollTop.toString());
    }
  };

  @HostListener('scroll', ['$event'])
  private onScroll(e) {
    // TODO: disable this in IE9
    const scrollTop = this.lastScrollTop = e.target.scrollTop;
    // console.log(scrollTop);
    this.scrollService.onScroll({
      event: e, scrollTop
    });
  }
}
