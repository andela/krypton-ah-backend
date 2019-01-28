const { sequelize, dataTypes } = require('sequelize-test-helpers');

const { expect } = require('chai');

const User = require('../../database/models/user');
const Article = require('../../database/models/articles');
const ArticlesReactions = require('../../database/models/articlesReaction');

describe('Test Article Model', () => {
  const articles = Article(sequelize, dataTypes);
  const article = new articles();

  context('Check if the Articles model exists', () => {
    it('should have model valid model name (Articles) ', () => {
      expect(articles.modelName).to.equal('Articles');
    });
  });

  context('Check the properties of the Articles Model', () => {
    it('The Articles model should have the property "Title"', () => {
      expect(article).to.have.property('title');
    });

    it('The Articles model should have the property "Description"', () => {
      expect(article).to.have.property('description');
    });

    it('The Articles model should have the property "Content"', () => {
      expect(article).to.have.property('content');
    });

    it('The Articles model should have the property "featured_ImageUrl"', () => {
      expect(article).to.have.property('featuredImageUrl');
    });

    it('The Articles model should have the property "averagerating"', () => {
      expect(article).to.have.property('averageRating');
    });

    it('The Articles model should have the property "Slug"', () => {
      expect(article).to.have.property('slug');
    });

    it('The Articles model should have the property "readTime"', () => {
      expect(article).to.have.property('readTime');
    });

    it('The Articles model should have the property "ispublished"', () => {
      expect(article).to.have.property('isPublished');
    });

    context('Check the article Model associations', () => {
      before(() => {
        articles.associate({
          User
        });
        articles.associate({
          ArticlesReactions
        });
      });

      it('should have a belongsTo association with UserModel', () => {
        expect(articles.belongsTo.calledWith(User)).to.equal(true);
      });
      it('should have a hasMany association with ArticleReaction model', () => {
        expect(articles.hasMany.calledWith(ArticlesReactions)).to.equal(true);
      });
    });
  });
});
