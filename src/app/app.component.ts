import { Component } from '@angular/core';

@Component({
  selector: 'narr-app',
  styles: [require('./app.component.scss').toString()],
  template: require('./app.component.html')
})
export class AppComponent {
  private name = 'Narr';
}
