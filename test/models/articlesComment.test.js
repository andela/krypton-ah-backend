const { sequelize, dataTypes } = require('sequelize-test-helpers');

const { expect } = require('chai');

const Articles = require('../../database/models/articles');
const User = require('../../database/models/user');
const articlesComment = require('../../database/models/articlesComment');

describe('Articles Comment Test', () => {
  const articlesComments = articlesComment(sequelize, dataTypes);
  const comment = new articlesComments();

  describe('Check if Articles Comment model exist', () => {
    it('should check if articlesComment have a valid model name', () => {
      expect(articlesComments.modelName).to.equal('articlesComments');
    });
    it('should check if articleComment Model has property "Comment" ', () => {
      expect(comment).to.have.property('comment');
    });
    it('should check if articleComment Model has property "mainCommentId" ', () => {
      expect(comment).to.have.property('mainCommentId');
    });
  });
  describe('Check the articleComment Model associations', () => {
    before(() => {
      articlesComments.associate({
        User,
        Articles
      });
    });
    it('should belong to User Model', () => {
      expect(articlesComments.belongsTo.calledWith(User)).to.equal(true);
    });
    it('should belong to a Articles Model', () => {
      expect(articlesComments.belongsTo.calledWith(Articles)).to.equal(true);
    });
  });
});
