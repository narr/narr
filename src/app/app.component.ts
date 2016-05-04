import { Component } from '@angular/core';

@Component({
  selector: 'narr-app',
  styles: [require('./app.scss').toString()],
  template: require('./app.html')
})
export class AppComponent {
  private _name = 'Narr';
}
