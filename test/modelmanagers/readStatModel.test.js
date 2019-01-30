const { expect } = require('chai'),
  ReadStatModelManager = require('../../lib/modelManagers/readStatModel'),
  UserModelManager = require('../../lib/modelManagers/usermodel'),
  ArticleModelManager = require('../../lib/modelManagers/articlemodel'),
  {
    destroyData, userdata, userdata2, goodArticle
  } = require('../mockData');
const { User, ReadStats } = require('../../database/models');

describe('Read stat model manager', async () => {
  const dataStore = {};
  afterEach('Delete models', async () => {
    destroyData();
  });
  describe('Create readStat', () => {
    before(async () => {
      dataStore.newUser = await UserModelManager.create(
        userdata.email,
        userdata.password,
        userdata.firstname,
        userdata.lastname
      );
      dataStore.newUser2 = await UserModelManager.create(
        userdata2.email,
        userdata2.password,
        userdata2.firstname,
        userdata2.lastname
      );
      const articleMock = goodArticle(dataStore.newUser.id);
      articleMock.title = 'New Title';
      articleMock.authorId = dataStore.newUser.id;
      dataStore.newArticle = await ArticleModelManager.createArticle(articleMock);
      dataStore.readStat = await ReadStatModelManager.createReadStat({
        articleId: dataStore.newArticle.id,
        userId: dataStore.newUser2.id
      });
      dataStore.userWithReadStat = await User.findOne({
        where: { id: dataStore.newUser2.id },
        include: [{ model: ReadStats, as: 'readstats' }]
      });
    });
    it('should create readStat', async () => {
      expect(dataStore.readStat[0].articleId).to.equal(dataStore.newArticle.id);
    });
  });

  describe('User can read many articles', () => {
    before(async () => {
      dataStore.author = await UserModelManager.create(
        'author@email.com',
        userdata.password,
        userdata.firstname,
        userdata.lastname
      );
      dataStore.newUser1 = await UserModelManager.create(
        userdata.email,
        userdata.password,
        userdata.firstname,
        userdata.lastname
      );
      dataStore.newUser2 = await UserModelManager.create(
        userdata2.email,
        userdata2.password,
        userdata2.firstname,
        userdata2.lastname
      );
      const articleMock = goodArticle(dataStore.author.id);
      const articleMock2 = goodArticle(dataStore.author.id);
      articleMock2.title = 'New Title2';
      dataStore.newArticle = await ArticleModelManager.createArticle(articleMock);
      dataStore.newArticle2 = await ArticleModelManager.createArticle(articleMock2);
      dataStore.readStat1 = await ReadStatModelManager.createReadStat({
        articleId: dataStore.newArticle.id,
        userId: dataStore.newUser2.id
      });
      dataStore.readStat2 = await ReadStatModelManager.createReadStat({
        articleId: dataStore.newArticle.id,
        userId: dataStore.newUser1.id
      });

      dataStore.readStat3 = await ReadStatModelManager.createReadStat({
        articleId: dataStore.newArticle2.id,
        userId: dataStore.newUser1.id
      });

      dataStore.userWithReadStat = await User.findOne({
        where: { id: dataStore.newUser1.id },
        include: [{ model: ReadStats, as: 'readstats' }]
      });
    });
    it('should create readStat', async () => {
      expect(dataStore.userWithReadStat.readstats.length).to.equal(2);
    });
  });

  describe('Update readStat', () => {
    before(async () => {
      dataStore.author = await UserModelManager.create(
        'author@email.com',
        userdata.password,
        userdata.firstname,
        userdata.lastname
      );
      dataStore.newUser1 = await UserModelManager.create(
        userdata.email,
        userdata.password,
        userdata.firstname,
        userdata.lastname
      );
      const articleMock = goodArticle(dataStore.author.id);
      dataStore.newArticle = await ArticleModelManager.createArticle(articleMock);
      dataStore.readStat1 = await ReadStatModelManager.createReadStat({
        articleId: dataStore.newArticle.id,
        userId: dataStore.newUser1.id
      });
    });
    it('should update readStat', async () => {
      dataStore.readStat1 = await ReadStatModelManager.updateReadStat({
        articleId: dataStore.newArticle.id,
        userId: dataStore.newUser1.id,
        readStat: 2
      });

      dataStore.userWithReadStat = await User.findOne({
        where: { id: dataStore.newUser1.id },
        include: [{ model: ReadStats, as: 'readstats' }]
      });
      expect(dataStore.userWithReadStat.readstats[0].readStat).to.equal(2);
    });
  });

  describe('Get readStat', () => {
    before(async () => {
      dataStore.author = await UserModelManager.create(
        'author@email.com',
        userdata.password,
        userdata.firstname,
        userdata.lastname
      );
      dataStore.newUser1 = await UserModelManager.create(
        userdata.email,
        userdata.password,
        userdata.firstname,
        userdata.lastname
      );

      const articleMock = goodArticle(dataStore.author.id);
      dataStore.newArticle = await ArticleModelManager.createArticle(articleMock);
      dataStore.readStat1 = await ReadStatModelManager.createReadStat({
        articleId: dataStore.newArticle.id,
        userId: dataStore.newUser1.id
      });
    });
    it('should get readStat', async () => {
      const gottenReadStatWithUserId = await ReadStatModelManager.getReadStat({
        readerId: dataStore.newUser1.id
      });
      const gottenReadStatWithArticleId = await ReadStatModelManager.getReadStat({
        articleId: dataStore.newArticle.id
      });
      const gottenReadStatWithBothId = await ReadStatModelManager.getReadStat({
        readerId: dataStore.newUser1.id,
        articleId: dataStore.newArticle.id
      });
      expect(gottenReadStatWithArticleId.length).to.equal(1);
      expect(gottenReadStatWithUserId.length).to.equal(1);
      expect(gottenReadStatWithBothId.length).to.equal(1);
      expect(gottenReadStatWithBothId[0].article.title)
        .to.equal(dataStore.newArticle.title);
      expect(gottenReadStatWithBothId[0].article.description)
        .to.equal(dataStore.newArticle.description);
    });
  });

  describe('readStatUpdater', () => {
    beforeEach(async () => {
      dataStore.author = await UserModelManager.create(
        'author@email.com',
        userdata.password,
        userdata.firstname,
        userdata.lastname
      );
      dataStore.newUser1 = await UserModelManager.create(
        userdata.email,
        userdata.password,
        userdata.firstname,
        userdata.lastname
      );
      const articleMock = goodArticle(dataStore.author.id);
      dataStore.newArticle = await ArticleModelManager.createArticle(articleMock);
    });
    it('should create new readStat', async () => {
      dataStore.readStat1 = await ReadStatModelManager.readStatUpdater(
        dataStore.newUser1.id,
        dataStore.newArticle.id,
      );

      dataStore.userWithReadStat = await User.findOne({
        where: { id: dataStore.newUser1.id },
        include: [{ model: ReadStats, as: 'readstats' }]
      });
      expect(dataStore.userWithReadStat.readstats[0].readStat).to.equal(1);
    });
    it('should create and update readStat', async () => {
      await ReadStatModelManager.readStatUpdater(
        dataStore.newUser1.id,
        dataStore.newArticle.id,
      );

      await ReadStatModelManager.readStatUpdater(
        dataStore.newUser1.id,
        dataStore.newArticle.id,
      );

      dataStore.userWithReadStat = await User.findOne({
        where: { id: dataStore.newUser1.id },
        include: [{ model: ReadStats, as: 'readstats' }]
      });
      expect(dataStore.userWithReadStat.readstats[0].readStat).to.equal(2);
    });
    it('should not create or update readStat', async () => {
      await ReadStatModelManager.readStatUpdater(
        '',
        dataStore.newArticle.id,
      );

      await ReadStatModelManager.readStatUpdater(
        dataStore.newUser1.id,
        '',
      );

      dataStore.userWithReadStat = await User.findOne({
        where: { id: dataStore.newUser1.id },
        include: [{ model: ReadStats, as: 'readstats' }]
      });
      expect(dataStore.userWithReadStat.readstats.length).to.equal(0);
    });
  });
});
