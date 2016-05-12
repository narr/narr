import { Injectable } from '@angular/core';

import { PortfolioModel } from './portfolio.model';

@Injectable()
export class PortfolioService {

  getPortfolios() {
    return [
      new PortfolioModel({
        url: require('asset/img/p1.jpg'),
        alt: 'portfolio image1',
        title: 'San Francisco',
        txt: 'Posted in: cities 1 days ago'
      }),
      new PortfolioModel({
        url: require('asset/img/p2.jpg'),
        alt: 'portfolio image2',
        title: 'Greece Athena',
        txt: 'Posted in: cities 2 days ago'
      }),
      new PortfolioModel({
        url: require('asset/img/p3.jpg'),
        alt: 'portfolio image3',
        title: 'San Francisco',
        txt: 'Posted in: cities 2 days ago'
      }),
      new PortfolioModel({
        url: require('asset/img/p4.jpg'),
        alt: 'portfolio image4',
        title: 'City Street',
        txt: 'Posted in: cities 6 days ago'
      }),
      new PortfolioModel({
        url: require('asset/img/p5.jpg'),
        alt: 'portfolio image5',
        title: 'San Francisco',
        txt: 'Posted in: cities 6 days ago'
      }),
      new PortfolioModel({
        url: require('asset/img/p6.jpg'),
        alt: 'portfolio image6',
        title: 'City Bus',
        txt: 'Posted in: other 7 days ago'
      })
    ];
  }
}
