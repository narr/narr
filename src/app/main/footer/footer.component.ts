import { Component } from '@angular/core';

import { TestimonialComponent, TestimonialModel } from './testimonial';

@Component({
  selector: 'narr-footer',
  template: require('./footer.component.html'),
  directives: [TestimonialComponent]
})
export class FooterComponent {
  private testmonialArray: TestimonialModel[];

  constructor() {
    this.testmonialArray = [
      new TestimonialModel({
        imgUrl: require('asset/img/testimonial1.jpg'),
        link: 'http://en.wikipedia.org/wiki/Nelson_Mandela',
        who: 'Nelson Mandela'
      }),
      new TestimonialModel({
        imgUrl: require('asset/img/testimonial2.jpg'),
        link: 'http://en.wikipedia.org/wiki/Mahatma_Gandhi',
        who: 'Mahatma Gandhi'
      }),
      new TestimonialModel({
        imgUrl: require('asset/img/testimonial3.jpg'),
        link: 'http://en.wikipedia.org/wiki/Mother_Teresa',
        who: 'Mother Teresa'
      })
    ];
  }
}
