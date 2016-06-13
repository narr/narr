import { Component } from '@angular/core';

import { AboutComponent } from './about';
import { ContactComponent } from './contact';
import { IntroComponent } from './intro';
import { TimelineComponent } from './timeline';

@Component({
  selector: 'narr-main',
  template: require('./main.component.html'),
  styles: [require('./main.component.scss').toString()],
  directives: [
    AboutComponent, ContactComponent, IntroComponent, TimelineComponent
  ]
})
export class MainComponent { }
