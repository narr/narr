/**
 * https://github.com/narr/narr/issues/7
 * https://github.com/angular/universal/issues/436
 *
 * As ng removes attribute, for example '_ngcontent-ayv-1' that is generated from Server rendering
 * for its own style, there is no problem for CSS except root component.
 * Ng doesn't delete its root component attribute so style from Server rendering and one from
 * Ng bootstrap in Browser would be conflicted.
 * Thus, don't render style tag for root component in Browser
 */
export class StyleCheckService {
  static getStyleStr(styleText: string): string[] {
    let styles = [styleText];
    // if HTML is from Server rendering
    if ('development' === ENV || 'production' == ENV &&
      (<any>document.getElementsByTagName('narr-app')[0]).children.length > 0) {
      styles = null;
    }
    return styles;
  }
}
