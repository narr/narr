import { Component } from '@angular/core';

import { AboutComponent } from './about';
import { ContactComponent } from './contact';
import { FooterComponent } from './footer';
import { IntroComponent } from './intro';
import { PortfolioComponent } from './portfolio';

@Component({
  selector: 'narr-main',
  template: require('./main.component.html'),
  styles: [require('./main.component.scss').toString()],
  directives: [
    AboutComponent, ContactComponent, IntroComponent, PortfolioComponent, FooterComponent
  ]
})
export class MainComponent {
}
