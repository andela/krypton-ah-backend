const { sequelize, dataTypes } = require('sequelize-test-helpers');

const { expect } = require('chai');

const ArticleTag = require('../../database/models/articleTag');

describe('Test articleTag Model', () => {
  const articleTags = ArticleTag(sequelize, dataTypes);
  const articleTag = new articleTags();

  context('Check if the articleTag model exists', () => {
    it('should have valid model name (ArticleTags) ', () => {
      expect(articleTags.modelName).to.equal('ArticleTags');
    });
  });

  context('Check the properties of the articleTag model', () => {
    it('should have the property "articleId"', () => {
      expect(articleTag).to.have.property('articleId');
    });
  });
  context('Check the properties of the articleTag model', () => {
    it('should have the property "tagId"', () => {
      expect(articleTag).to.have.property('tagId');
    });
  });
});
