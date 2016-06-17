import { ControlGroup, FormBuilder, Validators } from '@angular/common';
import { Component, Inject } from '@angular/core';

import { ScrollService } from '../../shared';

@Component({
  selector: 'narr-contact',
  template: require('./contact.component.html')
})
export class ContactComponent {
  contactForm: ControlGroup;
  email = 'nardgu@gmail.com';
  formDirty = false;
  infoError = false;
  links = [
    {
      name: 'github',
      href: 'https://github.com/narr',
      class: 'fa fa-github'
    },
    {
      name: 'linkedin',
      href: 'https://www.linkedin.com/in/narrkim',
      class: 'fa fa-linkedin'
    },
    {
      name: 'twitter',
      href: 'https://twitter.com/nardgu',
      class: 'fa fa-twitter'
    },
    {
      name: 'blog',
      href: 'https://narr.github.io/blog/',
      class: 'fa fa-rss'
    }
  ];
  submitEnd;
  submitStart = false;
  submitted = false;

  private BASE_STRING = 'Feel free to send me a msg..!!';
  INFO_STRING = this.BASE_STRING;

  private MSG_MAX_LENGTH = 150;
  private MSG_MIN_LENGTH = 2;
  private MSG_ERR_STRING = `
    Message is required. The max length is ${this.MSG_MAX_LENGTH} and the min length is
    ${this.MSG_MIN_LENGTH}.`;
  private SUBJECT_MAX_LENGTH = 24;
  private SUBJECT_ERR_STRING = `
    Subject is required and the max length is ${this.SUBJECT_MAX_LENGTH}.`;

  private SUBMIT_BUTTON_PULSE_ANI_DURATION = 3000;
  private SUBMIT_BUTTON_END_ANI_DURATION = 500;
  private SUBMIT_BUTTON_START_ANI_DURATION = 500 + this.SUBMIT_BUTTON_PULSE_ANI_DURATION;
  private SUBMIT_BUTTON_TIMEOUT_FOR_BLINK = 100;

  private SUBMITTED_STRING = 'Thanks..!!';
  private TOP_TAG_NAME = 'NARR-INTRO';

  constructor(
    @Inject(Window) private window: Window,
    private formBuilder: FormBuilder,
    private scrollService: ScrollService
  ) {
    this.contactForm = formBuilder.group({
      // subject: ['', Validators.compose([
      //   Validators.required,
      //   Validators.pattern('test.*?')
      // ])],
      subject: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(this.SUBJECT_MAX_LENGTH)
      ])],
      msg: ['', Validators.compose([
        Validators.required,
        Validators.minLength(this.MSG_MIN_LENGTH),
        Validators.maxLength(this.MSG_MAX_LENGTH)
      ])],
    });
    // (<any>this.contactForm.controls['subject']).updateValue('TEST test');
    // (<any>this.contactForm.statusChanges).emit();
    // console.log(this.contactForm);
    this.contactForm.statusChanges.subscribe(val => {
      const form = this.contactForm;
      if (form.dirty && !form.valid) {
        if (form.controls['subject'].dirty && !form.controls['subject'].valid) {
          this.INFO_STRING = this.SUBJECT_ERR_STRING;
          this.infoError = true;
        } else if (form.controls['msg'].dirty && !form.controls['msg'].valid) {
          this.INFO_STRING = this.MSG_ERR_STRING;
          this.infoError = true;
        } else {
          this.INFO_STRING = this.BASE_STRING;
          this.infoError = false;
        }
      } else {
        this.INFO_STRING = this.BASE_STRING;
        this.infoError = false;
      }
    });
  }

  onClick(e) {
    e.preventDefault();
    // console.log(e);
    this.scrollService.scrollTo(this.TOP_TAG_NAME);
  }

  onSubmit() {
    this.formDirty = true;
    this.submitted = true;
    if (this.contactForm.valid) {
      this.INFO_STRING = this.SUBMITTED_STRING;
      this.submitStart = true;
      this.submitEnd = false;
      setTimeout(() => {
        this.endSubmit();
      }, this.SUBMIT_BUTTON_START_ANI_DURATION); // duration of submit button's start ani
    } else {
      // to maintain its 'info' element's height and make its text blink
      // use HTML Entity and innerHtml Directive
      this.INFO_STRING = '&nbsp;';
      setTimeout(() => {
        if (this.contactForm.controls['subject'].valid) {
          this.INFO_STRING = this.MSG_ERR_STRING;
        } else {
          this.INFO_STRING = this.SUBJECT_ERR_STRING;
        }
        this.infoError = true;
        this.submitted = false;
      }, this.SUBMIT_BUTTON_TIMEOUT_FOR_BLINK);
    }
  }

  private endSubmit() {
    this.submitStart = false;
    this.submitEnd = true;
    setTimeout(() => {
      this.INFO_STRING = this.BASE_STRING;
      const controls = this.contactForm.controls;
      const subject = controls['subject'].value;
      const msg = controls['msg'].value;
      const mailto = `mailto:${this.email}?subject=${encodeURIComponent(subject)}&body=` +
        `${encodeURIComponent(msg)}`;

      // console.log(mailto);
      this.window.location.href = mailto;
      this.submitted = false;
    }, this.SUBMIT_BUTTON_END_ANI_DURATION); // duration of submit button's end ani
  }
}
