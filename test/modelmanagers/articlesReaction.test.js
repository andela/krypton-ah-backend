const chai = require('chai'),
  sinonChai = require('sinon-chai'),
  { expect, should } = chai,
  {
    getTotalReactions,
    getUserReaction,
    getReaction,
    createReaction,
    updateReaction,
    removeReaction
  } = require('../../lib/modelManagers/articlesReactionModel');
const { Articles, ArticlesReactions } = require('../../database/models');
const { create } = require('../../lib/modelManagers/usermodel');
const { article, articleReaction, destroyData } = require('../mockData');
const {
  email, password, firstname, lastname
} = require('../mockData').userdata4;

let newUser, newArticle, newReaction;
chai.use(sinonChai);
chai.use(should);
describe('Test for article reaction model', () => {
  before(async () => {
    destroyData();
    newUser = await create(email, password, firstname, lastname);
    newArticle = await Articles.create(article(newUser.id));
    newReaction = await ArticlesReactions.create(articleReaction(newArticle.id, newUser.id));
  });
  after(() => {
    destroyData();
  });

  it('Should return number of reactions for an article', async () => {
    const where = {
      articleId: newArticle.id
    };
    const returnedValue = await getTotalReactions(where);
    expect(returnedValue).to.be.an('array');
    expect(returnedValue.length).to.eql(1);
    expect(returnedValue[0]).to.be.an('object');
    expect(returnedValue[0]).to.have.property('reaction');
    expect(returnedValue[0].reaction).to.eql('like');
  });

  it('Should return an existing reaction for a user', async () => {
    const returnedValue = await getUserReaction(newArticle.id, newUser.id);
    expect(returnedValue).to.be.an('object');
    expect(returnedValue.dataValues.userId).to.be.eql(newUser.id);
    expect(returnedValue.dataValues.articleId).to.be.eql(newArticle.id);
    expect(returnedValue.dataValues.reaction).to.be.eql('like');
  });

  it('Should return reaction if the id is valid', async () => {
    const returnedValue = await getReaction(newReaction.id);
    expect(returnedValue).to.be.an('object');
    expect(returnedValue.dataValues).to.have.property('userId');
    expect(returnedValue.dataValues).to.have.property('articleId');
    expect(returnedValue.dataValues).to.have.property('reaction');
  });

  it('Should save a new reaction to the database', async () => {
    const articleId = newArticle.id,
      userId = newUser.id,
      testReaction = 'like';

    const returnedValue = await createReaction(articleId, userId, testReaction);
    expect(returnedValue).to.be.an('object');
    expect(returnedValue.dataValues.userId).to.be.eql(newUser.id);
    expect(returnedValue.dataValues.articleId).to.be.eql(newArticle.id);
    expect(returnedValue.dataValues.reaction).to.be.eql('like');
  });

  it('Should update existing reaction of a user', async () => {
    const articleId = newArticle.id,
      userId = newUser.id,
      testReaction = 'dislike';

    await updateReaction(testReaction, articleId, userId);
  });

  it('Should delete an existing reaction of a user', async () => {
    const returnedValue = await removeReaction(newReaction.id, newUser.id);
    expect(returnedValue).to.be.a('number');
    expect(returnedValue).to.be.eql(1);
  });
});
