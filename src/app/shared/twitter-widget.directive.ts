import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[narrLoadTwidget]'
})
export class TwitterWidgetDirective implements OnInit {
  constructor(private el: ElementRef) { }

  ngOnInit() {
    const protocol = /^http:/.test(document.location.toString()) ? 'http' : 'https';
    const tag = document.createElement('script');
    tag.id = 'twitter-wjs';
    tag.src = protocol + '://platform.twitter.com/widgets.js';
    this.el.nativeElement.appendChild(tag);
  }
}
