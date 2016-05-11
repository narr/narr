import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'narr-nav',
  styles: [require('./nav.component.scss').toString()],
  template: require('./nav.component.html')
})
export class NavComponent {
  private SIDEBAR_ACTIVE_MAX_RANGE = 800;

  private sidebarAni: boolean; // to animate only by click not resizing window
  private sidebarActive: boolean;
  @Output() private sidebarTrigger = new EventEmitter();

  private onClick(e) {
    e.preventDefault();
    this.sidebarAni = true;
    if (!this.sidebarActive) {
      this.sidebarTrigger.emit(window.document.body.scrollTop);
    }
    this.sidebarActive = !this.sidebarActive;
  }

  private onWindowResize(e) {
    this.sidebarAni = false;
    if (window.innerWidth > this.SIDEBAR_ACTIVE_MAX_RANGE) {
      this.sidebarActive = false;
    }
  }
}
