const { sequelize, dataTypes } = require('sequelize-test-helpers');

const { expect } = require('chai');

const User = require('../../database/models/user');
const Article = require('../../database/models/articles');

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
      expect(article).to.have.property('Title');
    });

    it('The Articles model should have the property "Description"', () => {
      expect(article).to.have.property('Description');
    });

    it('The Articles model should have the property "Content"', () => {
      expect(article).to.have.property('Content');
    });

    it('The Articles model should have the property "featured_ImageUrl"', () => {
      expect(article).to.have.property('featuredImageUrl');
    });

    it('The Articles model should have the property "averagerating"', () => {
      expect(article).to.have.property('averageRating');
    });

    it('The Articles model should have the property "Slug"', () => {
      expect(article).to.have.property('Slug');
    });

    it('The Articles model should have the property "readTime"', () => {
      expect(article).to.have.property('readTime');
    });

    it('The Articles model should have the property "ispublished"', () => {
      expect(article).to.have.property('ispublished');
    });

    context('Check the article Model associations', () => {
      before(() => {
        articles.associate({
          User,
        });
      });

      it('should have a belongsTo association with UserModel', () => {
        expect(articles.belongsTo.calledWith(User)).to.equal(true);
      });
    });
  });
});
