const { expect } = require('chai');
const UserModelManager = require('../../lib/modelManagers/usermodel');
const bookmark = require('../../lib/modelManagers/bookmarkManager');
const articles = require('../../lib/modelManagers/articlemodel');
const mockData = require('../mockData');

let res;
let newBookmark = {};
describe('Unit to Test Bookmark Model Manager', () => {
  const userData1 = {
    email: mockData.userdata.email,
    password: mockData.userdata.password,
    firstname: mockData.userdata.firstname,
    lastname: mockData.userdata.lastname
  };

  after('Delete Tables', async () => {
    mockData.destroyData();
  });


  before(async () => {
    mockData.destroyData();
    const user1 = await UserModelManager.create(
      userData1.email,
      userData1.password,
      userData1.firstname,
      userData1.lastname
    );

    const articleMockData = mockData.article(user1.dataValues.id);
    const writeUp = await articles.createArticle(articleMockData);

    newBookmark = {
      articleId: writeUp.dataValues.id,
      userId: user1.dataValues.id
    };
  });

  context('Test function that creates bookmark', () => {
    it('should create a new bookmark for valid parameters when there is no conflict', async () => {
      res = await bookmark.createBookmark(newBookmark.userId, newBookmark.articleId);
      expect(res).to.be.an('object');
      expect(res.dataValues).to.be.an('object');
      expect(res.dataValues).to.haveOwnProperty('articleId').equal(newBookmark.articleId);
      expect(res.dataValues).to.haveOwnProperty('userId').equal(newBookmark.userId);
    });
  });

  context('Test function that get article bookmarked by a specific user', () => {
    it('should get user article for valid parameters when there is no conflict', async () => {
      res = await bookmark.getBookmarkedArticles(newBookmark.userId);
      expect(res).to.be.an('object');
      expect(res).to.haveOwnProperty('count').be.equal(1);
      expect(res).to.haveOwnProperty('bookmarks').be.an('array');
      expect(res.bookmarks[0]).to.haveOwnProperty('dataValues').be.an('object');
      expect(res.bookmarks[0].dataValues).haveOwnProperty('createdAt');
      expect(res.bookmarks[0].dataValues).haveOwnProperty('updatedAt');
      expect(res.bookmarks[0].dataValues).to.haveOwnProperty('Article').be.an('object');
      expect(res.bookmarks[0].dataValues.Article.dataValues).haveOwnProperty('id');
      expect(res.bookmarks[0].dataValues.Article.dataValues).haveOwnProperty('title');
      expect(res.bookmarks[0].dataValues.Article.dataValues).haveOwnProperty('featuredImageUrl');
    });
  });

  context('Test function that creates bookmark', () => {
    it('should create a new bookmark for valid parameters when there is no conflict', async () => {
      res = await bookmark.deleteBookmark(newBookmark.articleId, newBookmark.userId);
      expect(res).to.equal(1);
    });
  });
});
