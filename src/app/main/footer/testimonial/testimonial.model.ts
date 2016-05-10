const TESTMONIAL_DEFAULT = `
  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
  when an unknown printer took a galley
`;

export class TestimonialModel {
  private imgUrl: string;
  private alt: string;
  private words: string;
  private link: string;
  private who: string;

  constructor(
    {
      imgUrl,
      alt = 'testimonial people',
      words = TESTMONIAL_DEFAULT,
      link,
      who
    }: {
        imgUrl: string,
        alt?: string,
        words?: string,
        link: string,
        who: string
      }) {
    this.imgUrl = imgUrl;
    this.alt = alt;
    this.words = words;
    this.link = link;
    this.who = who;
  }
}
