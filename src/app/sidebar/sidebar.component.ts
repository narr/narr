import { Component, Input } from '@angular/core';

@Component({
  selector: 'narr-sidebar',
  styles: [require('./sidebar.component.scss').toString()],
  template: require('./sidebar.component.html')
})
export class SidebarComponent {
  @Input() private sidebarActive: string;
  private thumbnail = require('asset/img/wfp.png');
}
