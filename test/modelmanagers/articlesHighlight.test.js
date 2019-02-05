const { expect } = require('chai');
const ArticlesHighlightManager = require('../../lib/modelManagers/articlesHighlightModel');
const UserModelManager = require('../../lib/modelManagers/usermodel');
const { Articles, ArticlesComments } = require('../../database/models');
const { userMock } = require('../../constants');
const {
  destroyData,
  comment,
  article,
  createArticlesHighlightMock
} = require('../mockData');

describe('User Profile Model Manager', async () => {
  const dataStore = {};
  afterEach('Delete db data', async () => {
    destroyData();
  });
  before('Create articles hightlight', async () => {
    dataStore.newUser = await UserModelManager.create(
      userMock.email,
      userMock.password,
      userMock.firstname,
      userMock.lastname
    );
    dataStore.newArticle = await Articles.create(article(dataStore.newUser.id));
    dataStore.articleComment = await ArticlesComments
      .create(comment(dataStore.newArticle.id, dataStore.newUser.id));
  });
  it('should create article highlight', async () => {
    const articlesHighlightMock = createArticlesHighlightMock(
      dataStore.newArticle.id,
      dataStore.articleComment.id
    );
    const createdHighlight = await ArticlesHighlightManager
      .createArticlesHighlight(articlesHighlightMock);
    const {
      updatedAt, createdAt, id, ...createdData
    } = createdHighlight.dataValues;
    expect(createdData).to.eql(articlesHighlightMock);
  });
});
