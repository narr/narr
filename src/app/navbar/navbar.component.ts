import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'narr-navbar',
  styles: [require('./navbar.component.scss').toString()],
  template: require('./navbar.component.html')
})
export class NavbarComponent {
  @Output() private triggerSidebar = new EventEmitter();

  private onClick(e) {
    e.preventDefault();
    e.stopPropagation(); // to ignore the click event on App component
    // console.log(e);
    this.triggerSidebar.emit(null);
  }
}
