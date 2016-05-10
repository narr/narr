import { Component } from '@angular/core';

@Component({
  selector: 'narr-sidebar',
  styles: [require('./sidebar.component.scss').toString()],
  template: require('./sidebar.component.html')
})
export class SidebarComponent {
  private thumbnail = require('asset/img/wfp.png');

  private onClick(e) {
    e.preventDefault();
    console.log(e);
  }
}
