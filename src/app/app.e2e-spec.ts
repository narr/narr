describe('/', () => {
  beforeEach(() => {
    browser.get('/');
  });

  it('should have a title', () => {
    const subject = browser.getTitle();
    const result = 'NARR';
    expect(subject).toEqual(result);
  });
});
