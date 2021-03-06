import { Directive, ElementRef, Inject, OnInit } from '@angular/core';

import { RainBg } from './rain-bg.model'

@Directive({
  selector: '[narrRainBg]'
})
export class RainBgDirective implements OnInit {
  private canvasW: number;
  private canvasH: number;
  private ctx;
  // private particles: Array<RainBg>;
  private particles: RainBg[];
  private MAX_PARTS: number = 40;
  private SPEED: number = 0.4;

  constructor(
    @Inject(Window) private window: Window,
    private el: ElementRef
  ) { }

  ngOnInit() {
    // console.log(this.el.nativeElement);
    const canvas = this.el.nativeElement;
    if (canvas.getContext) {
      // this.canvasW = canvas.width = canvas.offsetWidth;
      // this.canvasH = canvas.height = canvas.offsetHeight;
      this.canvasW = canvas.width = 1920;
      this.canvasH = canvas.height = 1080;

      this.ctx = canvas.getContext('2d');
      // this.ctx.fillStyle = 'rgba(0, 144, 255, 0.3)'; // bg
      this.ctx.strokeStyle = 'rgba(174, 194, 224, 0.5)';
      this.ctx.lineWidth = 2;
      this.ctx.lineCap = 'round';

      this.setParticles();
      this.aniLoop();
    }
  }

  private aniLoop() {
    this.draw();
    this.window.requestAnimationFrame(this.aniLoop.bind(this));
  }

  // http://www.html5rocks.com/en/tutorials/canvas/performance/
  private draw() {
    this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);
    // this.ctx.fillRect(0, 0, this.canvasW, this.canvasH); // bg
    this.ctx.beginPath();
    for (let p of this.particles) {
      this.ctx.moveTo(p.x, p.y);
      this.ctx.lineTo(p.x + p.vx, p.y + p.vy);
    }
    this.ctx.stroke();
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

  private setParticles() {
    // console.log(Math.random());
    this.particles = [];
    for (let i = 0; i < this.MAX_PARTS; i++) {
      this.particles.push({
        x: Math.random() * this.canvasW,
        y: Math.random() * this.canvasH,
        vx: Math.random() * 4 - 2, // -2 <= vx < 2
        vy: Math.random() * 10 + 10 // 10 <= vy < 20
      })
    }
  }
}
