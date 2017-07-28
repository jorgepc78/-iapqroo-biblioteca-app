import { IapqrooBibliotecaAppPage } from './app.po';

describe('iapqroo-biblioteca-app App', () => {
  let page: IapqrooBibliotecaAppPage;

  beforeEach(() => {
    page = new IapqrooBibliotecaAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
