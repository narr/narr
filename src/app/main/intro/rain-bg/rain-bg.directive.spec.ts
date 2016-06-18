import {
  beforeEachProviders,
  describe,
  expect,
  inject,
  it
} from '@angular/core/testing';
import { ElementRef, provide } from '@angular/core';

import { RainBgDirective } from './rain-bg.directive';

describe('RainBgDirective', () => {
  beforeEachProviders(() => [
    RainBgDirective,
    provide(Window, { useValue: Window }),
    provide(ElementRef, { useValue: ElementRef })
  ]);

  it('should have random particles', inject([RainBgDirective], rainBg => {
    spyOn(Math, 'random').and.returnValue(0.4);
    const canvasW = rainBg.canvasW = 1920;
    const canvasH = rainBg.canvasH = 1080;
    rainBg.setParticles();

    const particles = rainBg.particles;
    const particle = particles[0];

    const subject = particles.length;
    const subject2 = particle.x < canvasW;
    const subject3 = particle.y < canvasH;
    const subject4 = -2 <= particle.vx && particle.vx < 2;
    const subject5 = 10 <= particle.vy && particle.vy < 20;

    const result = rainBg.MAX_PARTS;
    const result2 = true;
    const result3 = true;
    const result4 = true;
    const result5 = true;

    expect(subject).toEqual(result);
    expect(subject2).toEqual(result2);
    expect(subject3).toEqual(result3);
    expect(subject4).toEqual(result4);
    expect(subject5).toEqual(result5);
  }));

  it('should move by a pattern', inject([RainBgDirective], rainBg => {
    spyOn(Math, 'random').and.returnValue(0.999);
    const canvasW = rainBg.canvasW = 1920;
    const canvasH = rainBg.canvasH = 1080;
    rainBg.setParticles();

    const particles = rainBg.particles;
    const particle = particles[0];
    const oldX = particle.x;
    const oldY = particle.y;
    rainBg.move();

    const subject = particle.x === oldX + particle.vx || particle.x < canvasW;
    const subject2 = particle.y === oldY + particle.vy || -canvasH < particle.y;
    const result = true;
    const result2 = true;
    expect(subject).toEqual(result);
    expect(subject2).toEqual(result2);
  }));
});
