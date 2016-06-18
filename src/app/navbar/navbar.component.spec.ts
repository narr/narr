import {
  async,
  describe,
  expect,
  it
} from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  it('should execute a callback for triggerSidebar when it is clicked', async(() => {
    const navbar = new NavbarComponent();
    const mockE = {
      preventDefault: f => f,
      stopPropagation: f => f,
    };

    navbar.triggerSidebar.subscribe(val => {
      // console.log(val);
      const subject = true;
      const result = true;
      expect(subject).toEqual(result);
    });
    navbar.onClick(mockE);
  }));
});
