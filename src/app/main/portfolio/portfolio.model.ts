export class PortfolioModel {
  private url: string;
  private alt: string;
  private title: string;
  private txt: string;

  constructor(
    {
      url,
      alt = 'portfolio image',
      title,
      txt
    }: {
        url: string,
        alt?: string,
        title: string,
        txt: string
      }) {
    this.url = url;
    this.alt = alt;
    this.title = title;
    this.txt = txt;
  }
}
