const sinon = require('sinon'),
  { expect } = require('chai'),
  ArticlesHighlightManager = require('../../lib/modelManagers/articlesHighlightModel'),
  { requestMock, responseMock, nextMock } = require('../../constants'),
  createArticleHighlight = require('../../middlewares/createArticleHighlight');

describe('createArticleHighlight middleware', () => {
  afterEach(sinon.restore);
  it('creates article highlight', async () => {
    requestMock.body.highlightedText = 'Valid article highlight';
    const highlightStub = sinon.stub(ArticlesHighlightManager, 'createArticlesHighlight');
    await createArticleHighlight(requestMock, responseMock, nextMock.next);
    expect(highlightStub.calledOnce).to.equal(true);
  });
  it('does not create article highlight', async () => {
    delete requestMock.body.highlightedText;
    const highlightStub = sinon.stub(ArticlesHighlightManager, 'createArticlesHighlight');
    await createArticleHighlight(requestMock, responseMock, nextMock.next);
    expect(highlightStub.calledOnce).to.equal(false);
  });
});
