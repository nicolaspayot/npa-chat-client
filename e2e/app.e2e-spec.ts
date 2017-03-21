import { NpaChatClientPage } from './app.po';

describe('npa-chat-client App', () => {
  let page: NpaChatClientPage;

  beforeEach(() => {
    page = new NpaChatClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
