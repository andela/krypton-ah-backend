const chai = require('chai'),
  sinonChai = require('sinon-chai'),
  { expect, should } = chai,
  {
    getComment,
    getReaction,
    createReaction,
    updateReaction,
    removeReaction
  } = require('../../lib/modelManagers/commentsReactionModel');
const { Articles, ArticlesComments, CommentsReactions } = require('../../database/models');
const { create } = require('../../lib/modelManagers/usermodel');
const {
  article, comment, reaction, destroyData
} = require('../mockData');
const {
  email, password, firstname, lastname
} = require('../mockData').userdata;

let newUser, newArticle, newComment, newReaction;
chai.use(sinonChai);
chai.use(should);
describe('Test for comment reaction model', () => {
  before(async () => {
    destroyData();
    newUser = await create(email, password, firstname, lastname);
    newArticle = await Articles.create(article(newUser.id));
    newComment = await ArticlesComments.create(comment(newArticle.id, newUser.id));
    newReaction = await CommentsReactions.create(reaction(newComment.id, newUser.id));
  });
  after(() => {
    destroyData();
  });

  it('Should return true for an existing comment', async () => {
    const returnedValue = await getComment(newComment.id);
    expect(returnedValue).to.be.a('boolean');
    expect(returnedValue).to.be.eql(true);
  });

  it('Should return an existing reaction from the database', async () => {
    const returnedValue = await getReaction(newComment.id, newUser.id);
    expect(returnedValue).to.be.an('object');
    expect(returnedValue.dataValues.UserId).to.be.eql(newUser.id);
    expect(returnedValue.dataValues.commentId).to.be.eql(newComment.id);
    expect(returnedValue.dataValues.reaction).to.be.eql('dislike');
  });

  it('Should save a new reaction to the database', async () => {
    const commentId = newComment.id,
      userId = newUser.id,
      testReaction = 'like';

    const returnedValue = await createReaction(commentId, userId, testReaction);
    expect(returnedValue).to.be.an('object');
    expect(returnedValue.dataValues.UserId).to.be.eql(newUser.id);
    expect(returnedValue.dataValues.commentId).to.be.eql(newComment.id);
    expect(returnedValue.dataValues.reaction).to.be.eql('like');
  });

  it('Should update an existing reaction', async () => {
    const commentId = newComment.id,
      userId = newUser.id,
      newreaction = 'dislike';

    await updateReaction(newreaction, commentId, userId);
  });

  it('Should delete an existing reaction', async () => {
    const returnedValue = await removeReaction(newReaction.id);
    expect(returnedValue).to.be.a('number');
    expect(returnedValue).to.be.eql(1);
  });
});
