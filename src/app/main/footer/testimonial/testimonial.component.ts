import { Component, Input } from '@angular/core';

import { TestimonialModel } from './testimonial.model';

@Component({
  selector: 'narr-testimonial',
  template: require('./testimonial.component.html')
})
export class TestimonialComponent {
  @Input() testimonial: TestimonialModel;
}
