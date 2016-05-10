import { Component } from '@angular/core';

@Component({
  selector: 'narr-nav',
  styles: [require('./nav.component.scss').toString()],
  template: require('./nav.component.html')
})
export class NavComponent {
  private onClick(e) {
    e.preventDefault();
    console.log(e);
    // disable active hover
  }
}
