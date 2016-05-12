import { Component, OnInit } from '@angular/core';

import { PortfolioModel } from './portfolio.model';
import { PortfolioService } from './portfolio.service';

@Component({
  selector: 'narr-portfolio',
  template: require('./portfolio.component.html'),
  providers: [PortfolioService]
})
export class PortfolioComponent implements OnInit {
  // private pfArray: Array<PortfolioModel> = [];
  private pfArray: PortfolioModel[];

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit() {
    this.pfArray = this.portfolioService.getPortfolios();
  }
}
