import { WMSAdminPage } from './app.po';

describe('wmsadmin App', function() {
  let page: WMSAdminPage;

  beforeEach(() => {
    page = new WMSAdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
