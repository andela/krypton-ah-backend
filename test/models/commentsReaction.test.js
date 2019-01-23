const { sequelize, dataTypes } = require('sequelize-test-helpers');

const { expect } = require('chai');

const CommentsReaction = require('../../database/models/commentsReaction');

describe('Comments Reaction Test', () => {
  const CommentsReactions = CommentsReaction(sequelize, dataTypes);
  const reaction = new CommentsReactions();

  describe('Check if Articles Comment model exist', () => {
    it('should check if commentsReaction has a valid model name', () => {
      expect(CommentsReactions.modelName).to.equal('CommentsReactions');
    });
    it('should check if commentsReaction Model has property "UserId" ', () => {
      expect(reaction).to.have.property('UserId');
    });
    it('should check if commentsReaction Model has property "commentId" ', () => {
      expect(reaction).to.have.property('commentId');
    });
    it('should check if commentsReaction Model has property "reaction" ', () => {
      expect(reaction).to.have.property('reaction');
    });
  });
});
