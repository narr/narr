import { Component } from '@angular/core';

import { TwitterWidgetDirective } from '../../../app/shared';

@Component({
  selector: 'narr-about',
  template: require('./about.component.html'),
  directives: [TwitterWidgetDirective]
})
export class AboutComponent {
  private thumbnail = require('asset/img/wfp.png');
}
