const { sequelize, dataTypes } = require('sequelize-test-helpers');

const { expect } = require('chai');

const ArticlesReactions = require('../../database/models/articlesReaction');

describe('Article Reaction Test', () => {
  const ArticlesReaction = ArticlesReactions(sequelize, dataTypes);
  const reaction = new ArticlesReaction();

  describe('Check if Articles Reactions model exist', () => {
    it('should check if ArticlesReaction has a valid model name', () => {
      expect(ArticlesReaction.modelName).to.equal('ArticlesReactions');
    });
    it('should check if ArticlesReactions Model has property "userId" ', () => {
      expect(reaction).to.have.property('userId');
    });
    it('should check if commentsReaction Model has property "commentId" ', () => {
      expect(reaction).to.have.property('articleId');
    });
    it('should check if commentsReaction Model has property "reaction" ', () => {
      expect(reaction).to.have.property('reaction');
    });
  });
});
