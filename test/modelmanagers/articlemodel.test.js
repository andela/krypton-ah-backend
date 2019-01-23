const { expect } = require('chai');
const user = require('../../database/models').User;
const { userprofile } = require('../../database/models');
const article = require('../../lib/modelManagers/articlemodel');
const constants = require('../mockData');


let userid;
let res;
let articleid, article2id;
let testArticle, testArticle2;
describe('Unit test article model manager functions', () => {
  before(async () => {
    res = await user.create(constants.userdata).then(async (newUser) => {
      await userprofile.create(constants.userprofile);
      return newUser;
    });
    userid = res.dataValues.id;
    testArticle = constants.article(userid);
    testArticle2 = constants.article(userid);
    article2id = testArticle2.id;
  });

  it('should create a new article when all necesary fields are provided', async () => {
    const res = await article.createArticle(testArticle);
    articleid = res.dataValues.id;
    expect(res).to.be.an('object');
    const {
      createdAt, isPublished, updatedAt, numberOfReviews, id, ...rest
    } = res.dataValues;
    expect(rest).to.eql(testArticle);
    expect(res.dataValues.numberOfReviews).to.be.equals(0);
    expect(res.dataValues.isPublished).to.be.equals(false);
  });

  it('should update an article when update fields are provided and article exists', async () => {
    const updatedArticle = constants.updatearticle(userid);
    const res = await article.updateArticle(updatedArticle, articleid);
    const updatedDetails = await article.getArticlesby('id', articleid);
    expect(res).to.be.an('array');
    expect(res[0]).to.be.equals(1);
    expect(updatedDetails[0].dataValues.title).to.be.equals(updatedArticle.title);
    expect(updatedDetails[0].dataValues.content).to.be.equals(updatedArticle.content);
    expect(updatedDetails[0].dataValues.description).to.be.equals(updatedArticle.description);
    expect(updatedDetails[0].dataValues.featuredImageUrl)
      .to.be.equals(updatedArticle.featuredImageUrl);
    expect(updatedDetails[0].dataValues.averageRating).to.be.equals(updatedArticle.averageRating);
    expect(updatedDetails[0].dataValues.authorId).to.be.equals(updatedArticle.authorId);
    expect(updatedDetails[0].dataValues.slug).to.be.equals(updatedArticle.Slug);
    expect(updatedDetails[0].dataValues.readTime).to.be.equals(updatedArticle.readTime);
  });

  it('should get all articles filter by a specific field', async () => {
    await article.createArticle(testArticle2);
    const res = await article.getArticlesby('authorId', userid);
    expect(res.length).to.be.equals(2);
    expect(res[0].dataValues.authorId).to.be.equals(userid);
  });

  it('should display all articles when no column name is passed', async () => {
    const res = await article.getArticlesby();
    expect(res.length).to.be.equals(2);
  });

  it('should get all articles present in the database with 1 article page pagination', async () => {
    const res = await article.getArticlesby('authorId', userid, 1, 0);
    expect(res.length).to.be.equals(1);
    expect(res[0].dataValues.articleid).to.be.equals(testArticle.articleid);
  });

  it('should display the second article on the second of pagination', async () => {
    const res = await article.getArticlesby('authorId', userid, 1, 1);
    expect(res.length).to.be.equals(1);
    expect(res[0].dataValues.articleid).to.be.equals(article2id);
  });

  it('should delete an article when a valid id is provided', async () => {
    const res = await article.deleteArticle(articleid);
    expect(res).to.be.equals(1);
  });
});
