import { Component } from '@angular/core';

import { RainBgDirective } from './rain-bg';

@Component({
  selector: 'narr-intro',
  template: require('./intro.component.html'),
  directives: [RainBgDirective]
})
export class IntroComponent { }
