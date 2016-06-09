import { Injectable } from '@angular/core';

import { Timeline } from './timeline.model';

@Injectable()
export class TimelineService {
  private events: Timeline[];

  constructor() {
    this.events = [
      {
        name: 'Personal Projects',
        href: 'https://github.com/narr',
        time: 'October 2015 - Present',
        src: require('asset/img/event.github.jpg'),
        desc: `I have been familiarizing myself with new technologies like Webpack, Babel,
          Typescript, React, Redux, Angular2 and so on. To practice them, I have made some examples
          and websites with the skills on Github`
      },
      {
        name: 'INNORIX',
        href: 'http://www.innorix.com/en/',
        time: 'June 2014 - October 2015',
        src: require('asset/img/event.innorix.jpg'),
        desc: `As a senior Front-end developer, I built a Javascript library that helps developers
          integrate a file transfer system into thier websites using HTML5's drag and drop,
          Web Workers, jQuery, Less, Grunt, etc and made a developer tool for the library by
          customizing log4javascript library.`
      },
      {
        name: 'Usoftation',
        href: 'http://www.usoftation.com/index_en.php',
        time: 'June 2012 - June 2014',
        src: require('asset/img/event.usoftation.jpg'),
        desc: `Even though I had a title, Android developer on my business card, the most frequently
          used language at this time to me was Javascript. I had a chance to join a project to build
          a developer tool like Adobe Dreamweaver for designing a car GPS navigation. I was in
          charge of showing the result of designing by HTML including animations for user
          interaction`
      },
      {
        name: 'CPS telecom',
        href: 'http://www.cps.co.kr/english/',
        time: 'August 2010 - August 2011',
        src: require('asset/img/event.cps-telecom.jpg'),
        desc: `I worked as a technical engineer and mostly did the maintenance jobs on customers'
          sites`
      }
    ];
  }

  getEvents() {
    return this.events;
  }
}
