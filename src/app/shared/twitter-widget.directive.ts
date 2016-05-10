import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[narrLoadTwidget]'
})
export class TwitterWidgetDirective {
  constructor(private el: ElementRef) {
    const protocol = /^http:/.test(document.location.toString()) ? 'http' : 'https';
    const tag = document.createElement('script');
    tag.id = 'twitter-wjs';
    tag.src = protocol + '://platform.twitter.com/widgets.js';
    this.el.nativeElement.appendChild(tag);
  }
}
