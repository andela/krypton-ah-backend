const { expect } = require('chai'),
  sinon = require('sinon'),
  { requestMock } = require('../../constants'),
  ReadStatsManager = require('../../lib/modelManagers/readStatModel'),
  updateReadStat = require('../../middlewares/updateReadStat');

describe('updateReadStat middleware', async () => {
  afterEach(sinon.restore);
  it('should call readStatUpdater function', async () => {
    const readStatUpdaterStub = await sinon.stub(ReadStatsManager, 'readStatUpdater').returnsThis();
    requestMock.decodedToken = { payLoad: { id: 'mockreaderId' } };
    requestMock.params = { id: 'mockArticleId' };
    requestMock.authorId = 'mockauthorId';
    await updateReadStat(requestMock);
    expect(readStatUpdaterStub.calledOnce).to.equal(true);
    expect(readStatUpdaterStub.firstCall.args[0]).to.equal('mockreaderId');
    expect(readStatUpdaterStub.firstCall.args[1]).to.equal('mockArticleId');
  });
  it('should not call readStatUpdater function', async () => {
    const readStatUpdaterStub = await sinon.stub(ReadStatsManager, 'readStatUpdater').returnsThis();
    requestMock.decodedToken = { payLoad: 'mockauthorId' };
    requestMock.params = { id: 'mockArticleId' };
    requestMock.authorId = 'mockauthorId';
    await updateReadStat(requestMock);
    expect(readStatUpdaterStub.calledOnce).to.equal(false);
  });
  it('should not call readStatUpdater function', async () => {
    const readStatUpdaterStub = await sinon.stub(ReadStatsManager, 'readStatUpdater').returnsThis();
    requestMock.decodedToken = null;
    requestMock.params = { id: 'mockArticleId' };
    requestMock.authorId = 'mockauthorId';
    await updateReadStat(requestMock);
    expect(readStatUpdaterStub.calledOnce).to.equal(false);
  });
});
