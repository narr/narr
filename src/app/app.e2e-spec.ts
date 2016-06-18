describe('/', () => {
  beforeEach(() => {
    browser.get('/');
  });

  it('should have a title', () => {
    const subject = browser.getTitle();
    const result = 'NARR';
    expect(subject).toEqual(result);
  });

  it('should have active class after Contact, one of Sidebar menus is clicked and' +
    'its animation is finished', done => {
      const ANI_DURATION = 2000;
      const contact = element(by.css('narr-sidebar li:nth-child(4)'));
      contact.click();
      setTimeout(() => {
        contact.getAttribute('class').then(val => {
          const subject = val;
          const result = 'active';
          expect(subject).toContain(result);
          done();
        });
      }, ANI_DURATION);
    });
});
