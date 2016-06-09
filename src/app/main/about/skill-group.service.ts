import { Injectable } from '@angular/core';

import { SkillGroup } from './skill-group.model';

@Injectable()
export class SkillGroupService {
  private skillGroups: SkillGroup[];

  constructor() {
    this.skillGroups = [
      {
        summary: 'Language',
        skills: [
          {
            href: 'https://www.w3.org/TR/html5/',
            class: 'ic-html5',
            name: 'HTML5'
          },
          {
            href: 'https://www.w3.org/TR/CSS/',
            class: 'ic-css3',
            name: 'CSS3'
          },
          {
            href: 'http://www.sass-lang.com/',
            class: 'ic-sass',
            name: 'SASS'
          },
          {
            href: 'http://lesscss.org/',
            class: 'ic-less',
            name: 'LESS'
          },
          {
            href: 'http://www.ecma-international.org/ecma-262/6.0/',
            class: 'ic-js',
            name: 'Javascript'
          },
          {
            href: 'https://nodejs.org/en/',
            class: 'ic-nodejs',
            name: 'Node.js'
          },
          {
            href: 'https://www.typescriptlang.org/',
            class: 'ic-typescript',
            name: 'Typescript'
          }
        ]
      },
      {
        summary: 'Framework & Library',
        skills: [
          {
            href: 'https://jquery.com/',
            class: 'ic-jquery',
            name: 'jQuery'
          },
          {
            href: 'http://getbootstrap.com/',
            class: 'ic-bootstrap',
            name: 'Bootstrap'
          },
          {
            href: 'https://angular.io/',
            class: 'ic-angular',
            name: 'Angular'
          },
          {
            href: 'https://babeljs.io/',
            class: 'ic-babel',
            name: 'Babel'
          },
          {
            href: 'https://facebook.github.io/react/',
            class: 'ic-react',
            name: 'React'
          },
          {
            href: 'http://redux.js.org/',
            class: 'ic-redux',
            name: 'Redux'
          },
          {
            href: 'http://jasmine.github.io/',
            class: 'ic-jasmine',
            name: 'Jasmine'
          },
          {
            href: 'https://mochajs.org/',
            class: 'ic-mocha',
            name: 'Mocha'
          }
        ]
      },
      {
        summary: 'ETC',
        skills: [
          {
            href: 'https://www.npmjs.com/',
            class: 'ic-npm',
            name: 'NPM'
          },
          {
            href: 'https://webpack.github.io/',
            class: 'ic-webpack',
            name: 'Webpack'
          },
          {
            href: 'http://gulpjs.com/',
            class: 'ic-gulp',
            name: 'Gulp'
          },
          {
            href: 'http://gruntjs.com/',
            class: 'ic-grunt',
            name: 'Grunt'
          },
          {
            href: 'http://www.protractortest.org/',
            class: 'ic-protractor',
            name: 'Protractor'
          },
          {
            href: 'https://karma-runner.github.io/',
            class: 'ic-karma',
            name: 'Karma'
          },
          {
            href: 'http://nightwatchjs.org/',
            class: 'ic-nightwatchjs',
            name: 'Nightwatch.js'
          },
          {
            href: 'https://git-scm.com/',
            class: 'ic-git',
            name: 'Git'
          },
          {
            href: 'https://subversion.apache.org/',
            class: 'ic-svn',
            name: 'SVN'
          },
          {
            href: 'https://travis-ci.org/',
            class: 'ic-travis',
            name: 'Travis'
          },
          {
            href: 'https://www.docker.com/',
            class: 'ic-docker',
            name: 'Docker'
          },
          {
            href: 'https://www.firebase.com/',
            class: 'ic-firebase',
            name: 'Firebase'
          }
        ]
      }
    ];
  }

  getSkillGroups() {
    return this.skillGroups;
  }
}
