const { expect } = require('chai');
const {
  confirmCommentId,
  checkIfReactionExist,
  createReaction,
  updateOrRemoveReaction
} = require('../../lib/modelManagers/commentsReactionModel');
const { create } = require('../../lib/modelManagers/usermodel');
const { User, Articles, articlesComments } = require('../../database/models');
const { article, comment } = require('../mockData');
const {
  email, password, firstname, lastname
} = require('../mockData').userdata;

let newUser, newArticle, newComment;

describe('Test to check for model manager functions', () => {
  before(async () => {
    User.destroy({
      where: {}
    });
    Articles.destroy({
      where: {}
    });
    articlesComments.destroy({
      where: {}
    });
    newUser = await create(email, password, firstname, lastname);
    newArticle = await Articles.create(article(newUser.id));
    newComment = await articlesComments.create(comment(newArticle.id, newUser.id));
  });

  describe('Test to create a new reaction', () => {
    it('should create a new reaction without errors', async () => {
      await createReaction(newComment.id, newUser.id, 'dislike');
    });
    it('should check if the reaction was successfully created', async () => {
      const result = await checkIfReactionExist(newComment.id, newUser.id);
      expect(result.dataValues.UserId).to.eql(newUser.id);
      expect(result.dataValues.commentId).to.eql(newComment.id);
      expect(result.dataValues.reaction).to.eql(false);
    });
  });

  describe('Test to check for an existing comment Id', () => {
    const fakeUuid = '65719288-0395-445e-b587-2b98b70bdec9';

    it('should return true if the comment exists', async () => {
      const result = await confirmCommentId(newComment.id);
      expect(result).to.be.a('Boolean');
      expect(result).to.be.eql(true);
    });
    it('should throw an error if the id is not a uuid', async () => {
      try {
        expect(await confirmCommentId(3)).to.throw(Error, 'SequelizeDatabaseError');
      } catch (err) {
        expect(err.name).to.be.eql('SequelizeDatabaseError');
        expect(err.message).to.be.eql('operator does not exist: uuid = integer');
      }
    });

    it('should throw an error if the id is not a valid uuid', async () => {
      const result = await confirmCommentId('65719288-0395-445e-b587-2b98b70bdec9');
      expect(result).to.be.a('Boolean');
      expect(result).to.be.eql(false);
    });

    it('should throw an error if the userId or commentId does not exist', async () => {
      try {
        expect(await createReaction(fakeUuid, fakeUuid, true)).to.throw(Error);
      } catch (err) {
        expect(err).to.not.eql('null');
        expect(err.name).to.be.eql('SequelizeForeignKeyConstraintError');
        expect(err.message).to.be.a('string');
      }
    });
  });

  describe('Test to check for errors with invalid reaction values', () => {
    it('should throw an error if invalid values are passed to the function', async () => {
      try {
        expect(await checkIfReactionExist(3, 4)).to.throw(Error);
      } catch (err) {
        expect(err).to.not.eql('null');
        expect(err.name).to.be.eql('SequelizeDatabaseError');
        expect(err.message).to.be.eql('operator does not exist: uuid = integer');
      }
    });
  });

  describe('Test to change user reaction', () => {
    it('should change reaction without errors', async () => {
      await updateOrRemoveReaction(newComment.id, newUser.id, 'dislike', 'like');
    });
    it('should throw an error if the id is not a uuid', async () => {
      try {
        expect(await updateOrRemoveReaction(3, 3, 'dislike', 'like')).to.throw(Error);
      } catch (err) {
        expect(err.name).to.be.eql('SequelizeDatabaseError');
        expect(err.message).to.be.eql('operator does not exist: uuid = integer');
      }
    });
  });
  describe('Test to undo user reaction', () => {
    it('should undo reaction without errors', async () => {
      const result = await updateOrRemoveReaction(newComment.id, newUser.id, 'like', true);
      expect(result).to.be.eq(1);
    });
    it('should throw an error if the id is not a uuid', async () => {
      try {
        expect(await updateOrRemoveReaction(3, 3, 'like', true)).to.throw(Error);
      } catch (err) {
        expect(err.name).to.be.eql('SequelizeDatabaseError');
        expect(err.message).to.be.eql('operator does not exist: uuid = integer');
      }
    });
  });
});
