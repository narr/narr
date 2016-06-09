import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

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
export class AppComponent implements OnInit {
  private sidebarOpen: boolean = false;
  private sidebarSlide: boolean = false;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    if (window && 'ontouchstart' in window) {
      this.elementRef.nativeElement.classList.add('touch');
    }
    // this.elementRef.nativeElement.classList.add('touch'); // to test
  }

  @HostListener('click', ['$event'])
  private onClick(e) {
    // console.log(e);
    this.sidebarOpen = false;
  }

  private onDisableSlide() {
    this.sidebarSlide = false;
    this.sidebarOpen = false;
  }

  private onTriggerSidebar() {
    this.sidebarSlide = true;
    this.sidebarOpen = !this.sidebarOpen;
  }
}
