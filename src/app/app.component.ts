import { Component } from '@angular/core';

import { NavComponent } from './nav';
// to avoid a conflic between ./main.ts and ./main/index.ts, add index after main folder
import { MainComponent } from './main/index';
import { SidebarComponent } from './sidebar';

@Component({
  selector: 'narr-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.scss').toString()],
  directives: [NavComponent, MainComponent, SidebarComponent]
})
export class AppComponent {
}
