import { Injectable } from '@angular/core';

import { SkillsModel } from './skills.model';

@Injectable()
export class SkillService {
  private skills: Array<SkillsModel>;

  constructor() {
    this.skills = [
      {
        summary: 'Language',
        skill: [
          {
            href: 'https://www.w3.org/TR/html5/',
            class: 'ic-html5'
          },
          {
            href: 'https://www.w3.org/TR/CSS/',
            class: 'ic-css3'
          },
          {
            href: 'http://www.sass-lang.com/',
            class: 'ic-sass'
          },
          {
            href: 'http://lesscss.org/',
            class: 'ic-less'
          },
          {
            href: 'http://www.ecma-international.org/ecma-262/6.0/',
            class: 'ic-js'
          },
          {
            href: 'https://nodejs.org/en/',
            class: 'ic-nodejs'
          },
          {
            href: 'https://www.typescriptlang.org/',
            class: 'ic-typescript'
          }
        ]
      },
      {
        summary: 'Framework & Library',
        skill: [
          {
            href: 'https://jquery.com/',
            class: 'ic-jquery'
          },
          {
            href: 'http://getbootstrap.com/',
            class: 'ic-bootstrap'
          },
          {
            href: 'https://angular.io/',
            class: 'ic-angular'
          },
          {
            href: 'https://babeljs.io/',
            class: 'ic-babel'
          },
          {
            href: 'https://facebook.github.io/react/',
            class: 'ic-react'
          },
          {
            href: 'http://redux.js.org/',
            class: 'ic-redux'
          },
          {
            href: 'http://jasmine.github.io/',
            class: 'ic-jasmine'
          },
          {
            href: 'https://mochajs.org/',
            class: 'ic-mocha'
          }
        ]
      },
      {
        summary: 'ETC',
        skill: [
          {
            href: 'https://www.npmjs.com/',
            class: 'ic-npm'
          },
          {
            href: 'https://webpack.github.io/',
            class: 'ic-webpack'
          },
          {
            href: 'http://gulpjs.com/',
            class: 'ic-gulp'
          },
          {
            href: 'http://gruntjs.com/',
            class: 'ic-grunt'
          },
          {
            href: 'http://www.protractortest.org/',
            class: 'ic-protractor'
          },
          {
            href: 'https://karma-runner.github.io/',
            class: 'ic-karma'
          },
          {
            href: 'http://nightwatchjs.org/',
            class: 'ic-nightwatchjs'
          },
          {
            href: 'https://git-scm.com/',
            class: 'ic-git'
          },
          {
            href: 'https://subversion.apache.org/',
            class: 'ic-svn'
          },
          {
            href: 'https://travis-ci.org/',
            class: 'ic-travis'
          },
          {
            href: 'https://www.docker.com/',
            class: 'ic-docker'
          },
          {
            href: 'https://www.firebase.com/',
            class: 'ic-firebase'
          }
        ]
      }
    ];
  }

  getSkills() {
    return this.skills;
  }
}
