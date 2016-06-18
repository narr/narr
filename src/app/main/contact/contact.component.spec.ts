import {
  async,
  beforeEachProviders,
  describe,
  expect,
  fakeAsync,
  inject,
  it,
  tick
} from '@angular/core/testing';
import { FormBuilder } from '@angular/common';
import { provide } from '@angular/core';

import { ContactComponent } from './contact.component';
import { ScrollService } from '../../shared';

describe('ContactComponent', () => {
  beforeEachProviders(() => [
    ContactComponent,
    provide(Window, {
      useValue: {
        location: {
          href: ''
        }
      }
    }),
    provide(FormBuilder, { useClass: FormBuilder }),
    provide(ScrollService, { useValue: ScrollService })
  ]);

  describe('Info Text', () => {
    it('should show the base text when the form state is pristine or valid',
      async(inject([ContactComponent], contact => {
        contact.contactForm.statusChanges.subscribe(val => {
          const subject = contact.INFO_STRING;
          const subject2 = contact.infoError;
          const result = contact.BASE_STRING;
          const result2 = false;
          expect(subject).toEqual(result);
          expect(subject2).toEqual(result2);
        });
        contact.contactForm.statusChanges.emit();
      })));

    it('should show the subject error text when the subject is dirty and invalid',
      async(inject([ContactComponent], contact => {
        contact.contactForm.statusChanges.subscribe(val => {
          const subject = contact.INFO_STRING;
          const subject2 = contact.infoError;
          const result = contact.SUBJECT_ERR_STRING;
          const result2 = true;
          expect(subject).toEqual(result);
          expect(subject2).toEqual(result2);
        });
        contact.contactForm.controls['subject'].markAsDirty();
        contact.contactForm.statusChanges.emit();
      })));

    it('should show the msg error text when the msg is dirty and invalid',
      async(inject([ContactComponent], contact => {
        contact.contactForm.statusChanges.subscribe(val => {
          const subject = contact.INFO_STRING;
          const subject2 = contact.infoError;
          const result = contact.MSG_ERR_STRING;
          const result2 = true;
          expect(subject).toEqual(result);
          expect(subject2).toEqual(result2);
        });
        contact.contactForm.controls['msg'].markAsDirty();
        contact.contactForm.statusChanges.emit();
      })));

    it('should show the base text when the subject is dirty and valid and the msg is pristine',
      async(inject([ContactComponent], contact => {
        contact.contactForm.statusChanges.subscribe(val => {
          const subject = contact.INFO_STRING;
          const subject2 = contact.infoError;
          const result = contact.BASE_STRING;
          const result2 = false;
          expect(subject).toEqual(result);
          expect(subject2).toEqual(result2);
        });
        contact.contactForm.controls['subject'].markAsDirty();
        contact.contactForm.controls['subject'].updateValue('TEST test');
        contact.contactForm.statusChanges.emit();
      })));
  });

  describe('On Submit', () => {
    it('should change the submit status and Info text on valid',
      fakeAsync(inject([ContactComponent], contact => {
        contact.contactForm.statusChanges.subscribe(val => {
          contact.onSubmit();
          const subject = contact.formDirty;
          const subject2 = contact.submitted;
          const subject3 = contact.INFO_STRING;
          const subject4 = contact.submitStart;
          const subject5 = contact.submitEnd;

          const result = true;
          const result2 = true;
          const result3 = contact.SUBMITTED_STRING;
          const result4 = true;
          const result5 = false;

          expect(subject).toEqual(result);
          expect(subject2).toEqual(result2);
          expect(subject3).toEqual(result3);
          expect(subject4).toEqual(result4);
          expect(subject5).toEqual(result5);

          tick(contact.SUBMIT_BUTTON_START_ANI_DURATION);
          const subject6 = contact.submitStart;
          const subject7 = contact.submitEnd;
          const result6 = false;
          const result7 = true;
          expect(subject6).toEqual(result6);
          expect(subject7).toEqual(result7);

          tick(contact.SUBMIT_BUTTON_END_ANI_DURATION);
          const subject8 = contact.INFO_STRING;
          const subject9 = contact.submitted;
          const result8 = contact.BASE_STRING;
          const result9 = false;
          expect(subject8).toEqual(result8);
          expect(subject9).toEqual(result9);
        });
        contact.contactForm.controls['subject'].updateValue('subject test');
        contact.contactForm.controls['msg'].updateValue('msg test');
        contact.contactForm.statusChanges.emit();
        tick();
      })));

    it('should change the submit status and Info text when subject is invalid',
      fakeAsync(inject([ContactComponent], contact => {
        contact.contactForm.statusChanges.subscribe(val => {
          contact.onSubmit();
          const subject = contact.formDirty;
          const subject2 = contact.submitted;
          const subject3 = contact.INFO_STRING;
          const subject4 = contact.submitStart;
          const subject5 = contact.submitEnd;

          const result = true;
          const result2 = true;
          const result3 = '&nbsp;';
          const result4 = false;
          const result5 = undefined;

          expect(subject).toEqual(result);
          expect(subject2).toEqual(result2);
          expect(subject3).toEqual(result3);
          expect(subject4).toEqual(result4);
          expect(subject5).toEqual(result5);

          tick(contact.SUBMIT_BUTTON_TIMEOUT_FOR_BLINK);
          const subject6 = contact.INFO_STRING;
          const subject7 = contact.infoError;
          const subject8 = contact.submitted;

          const result6 = contact.SUBJECT_ERR_STRING;
          const result7 = true;
          const result8 = false;

          expect(subject6).toEqual(result6);
          expect(subject7).toEqual(result7);
          expect(subject8).toEqual(result8);
        });
        contact.contactForm.controls['msg'].updateValue('msg test');
        contact.contactForm.statusChanges.emit();
        tick();
      })));

    it('should change the submit status and Info text when msg is invalid',
      fakeAsync(inject([ContactComponent], contact => {
        contact.contactForm.statusChanges.subscribe(val => {
          contact.onSubmit();
          const subject = contact.formDirty;
          const subject2 = contact.submitted;
          const subject3 = contact.INFO_STRING;
          const subject4 = contact.submitStart;
          const subject5 = contact.submitEnd;

          const result = true;
          const result2 = true;
          const result3 = '&nbsp;';
          const result4 = false;
          const result5 = undefined;

          expect(subject).toEqual(result);
          expect(subject2).toEqual(result2);
          expect(subject3).toEqual(result3);
          expect(subject4).toEqual(result4);
          expect(subject5).toEqual(result5);

          tick(contact.SUBMIT_BUTTON_TIMEOUT_FOR_BLINK);
          const subject6 = contact.INFO_STRING;
          const subject7 = contact.infoError;
          const subject8 = contact.submitted;

          const result6 = contact.MSG_ERR_STRING;
          const result7 = true;
          const result8 = false;

          expect(subject6).toEqual(result6);
          expect(subject7).toEqual(result7);
          expect(subject8).toEqual(result8);
        });
        contact.contactForm.controls['subject'].updateValue('subject test');
        contact.contactForm.statusChanges.emit();
        tick();
      })));
  });
});
