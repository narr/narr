import { Directive, ElementRef, OnInit } from '@angular/core';

import { RainBgModel } from './rain-bg.model'

@Directive({
  selector: '[narrRainBg]'
})
export class RainBgDirective implements OnInit {
  private canvasW: number;
  private canvasH: number;
  private ctx;
  private particles: Array<RainBgModel>;
  private MAX_PARTS: number = 40;
  private SPEED: number = 0.4;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    // console.log(this.el.nativeElement);
    const canvas = this.el.nativeElement;
    if (canvas.getContext) {
      this.canvasW = canvas.width = canvas.offsetWidth;
      this.canvasH = canvas.height = canvas.offsetHeight;

      this.ctx = canvas.getContext('2d');
      this.ctx.strokeStyle = 'rgba(174, 194, 224, 0.5)';
      this.ctx.lineWidth = 2;
      this.ctx.lineCap = 'round';

      this.particles = [];
      for (let i = 0; i < this.MAX_PARTS; i++) {
        this.particles.push({
          x: Math.random() * this.canvasW,
          y: Math.random() * this.canvasH,
          vx: Math.random() * 4 - 2,
          vy: Math.random() * 10 + 10
        })
      }

      this.aniLoop();
    }
  }

  private aniLoop() {
    this.draw();
    window.requestAnimationFrame(this.aniLoop.bind(this));
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);
    for (let p of this.particles) {
      this.ctx.beginPath();
      this.ctx.moveTo(p.x, p.y);
      this.ctx.lineTo(p.x + p.vx, p.y + p.vy);
      this.ctx.stroke();
    }
    this.move();
  }

  private move() {
    for (let p of this.particles) {
      p.x += p.vx;
      p.y += p.vy * this.SPEED;
      if (p.x > this.canvasW || p.y > this.canvasH) {
        p.x = Math.random() * this.canvasW;
        p.y = Math.random() * this.canvasH * -1;
      }
    }
  }
}
