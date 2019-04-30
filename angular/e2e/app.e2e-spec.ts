import { TrojanTemplatePage } from './app.po';

describe('Trojan App', function() {
  let page: TrojanTemplatePage;

  beforeEach(() => {
    page = new TrojanTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
