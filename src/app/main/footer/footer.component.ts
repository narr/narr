import { Component, OnInit } from '@angular/core';

import { TestimonialComponent, TestimonialModel, TestimonialService } from './testimonial';

@Component({
  selector: 'narr-footer',
  template: require('./footer.component.html'),
  directives: [TestimonialComponent],
  providers: [TestimonialService]
})
export class FooterComponent implements OnInit {
  private testmonialArray: TestimonialModel[];

  constructor(private testimonialService: TestimonialService) { }

  ngOnInit() {
    this.testmonialArray = this.testimonialService.getTestimonials();
  }
}
