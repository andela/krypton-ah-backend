const { expect } = require('chai'),
  sinon = require('sinon'),
  { getUserReadStatController } = require('../../controllers/readStatsController'),
  UserModelManager = require('../../lib/modelManagers/usermodel'),
  ArticleModelManager = require('../../lib/modelManagers/articlemodel'),
  ReadStatModelManager = require('../../lib/modelManagers/readStatModel'),
  { requestMock, responseMock } = require('../../constants'),
  {
    destroyData, userdata, goodArticle
  } = require('../mockData'),
  {
    SERVER_ERROR_CODE,
    OK_CODE,
    GET_USER_READSTAT_SUCCESS,
    GET_USER_READSTAT_FAILED
  } = require('../../constants');

describe('Read stat model manager', async () => {
  const dataStore = {};
  afterEach('Delete models', async () => {
    destroyData();
  });
  describe('GET /readStat', () => {
    before(async () => {
      dataStore.newUser = await UserModelManager.create(
        userdata.email,
        userdata.password,
        userdata.firstname,
        userdata.lastname
      );
      dataStore.newUser1 = await UserModelManager.create(
        'newuser1@email.com',
        userdata.password,
        userdata.firstname,
        userdata.lastname
      );
      const articleMock = goodArticle(dataStore.newUser.id);
      articleMock.title = 'New Title';
      articleMock.authorId = dataStore.newUser.id;
      dataStore.newArticle = await ArticleModelManager.createArticle(articleMock);
      articleMock.title = 'New Title2';
      dataStore.newArticle2 = await ArticleModelManager.createArticle(articleMock);
      await ReadStatModelManager.readStatUpdater(dataStore.newUser1.id, dataStore.newArticle.id);
      await ReadStatModelManager.readStatUpdater(dataStore.newUser1.id, dataStore.newArticle.id);
      await ReadStatModelManager.readStatUpdater(dataStore.newUser1.id, dataStore.newArticle2.id);
    });
    afterEach(sinon.restore);
    it('should GET readStat for user who has read some articles', async () => {
      requestMock.decodedToken = { payLoad: dataStore.newUser1.id };
      const statusStub = sinon.stub(responseMock, 'status').returnsThis();
      const jsonStub = sinon.stub(responseMock, 'json').returnsThis();
      const expectedData = {
        totalRead: 3,
        totalNumberOfArticlesRead: 2,
        articlesRead: [{
          id: dataStore.newArticle.id,
          title: dataStore.newArticle.title,
          description: dataStore.newArticle.description,
          numberOfTimesRead: 2
        },
        {
          id: dataStore.newArticle2.id,
          title: dataStore.newArticle2.title,
          description: dataStore.newArticle2.description,
          numberOfTimesRead: 1
        }]
      };
      await getUserReadStatController(requestMock, responseMock);
      expect(jsonStub.firstCall.args[0].success).to.equal(true);
      expect(jsonStub.firstCall.args[0].message).to.equal(GET_USER_READSTAT_SUCCESS);
      expect(statusStub.calledOnceWithExactly(OK_CODE)).to.equal(true);
      expect(jsonStub.firstCall.args[0].data).to.eql(expectedData);
    });

    it('should GET readStat for user who has not read any article', async () => {
      requestMock.decodedToken = { payLoad: dataStore.newUser.id };
      const statusStub = sinon.stub(responseMock, 'status').returnsThis();
      const jsonStub = sinon.stub(responseMock, 'json').returnsThis();
      const expectedData = {
        totalRead: 0,
        totalNumberOfArticlesRead: 0,
        articlesRead: []
      };
      await getUserReadStatController(requestMock, responseMock);
      expect(jsonStub.firstCall.args[0].success).to.equal(true);
      expect(jsonStub.firstCall.args[0].message).to.equal(GET_USER_READSTAT_SUCCESS);
      expect(statusStub.calledOnceWithExactly(OK_CODE)).to.equal(true);
      expect(jsonStub.firstCall.args[0].data).to.eql(expectedData);
    });

    it('should GET readStat for user who has not read any article', async () => {
      requestMock.decodedToken = { payLoad: dataStore.newUser.id };

      sinon.stub(ReadStatModelManager, 'getReadStat').throws('Server error');
      const statusStub = sinon.stub(responseMock, 'status').returnsThis();
      const jsonStub = sinon.stub(responseMock, 'json').returnsThis();
      await getUserReadStatController(requestMock, responseMock);
      expect(statusStub.calledOnceWithExactly(SERVER_ERROR_CODE)).to.equal(true);
      expect(jsonStub.firstCall.args[0].success).to.equal(false);
      expect(jsonStub.firstCall.args[0].message).to.equal(GET_USER_READSTAT_FAILED);
    });
  });
});
