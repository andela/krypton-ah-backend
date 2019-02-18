const { sequelize, dataTypes } = require('sequelize-test-helpers');

const { expect } = require('chai');

const Articles = require('../../database/models/articles');
const categories = require('../../database/models/categories');

describe('Test the Bookmark Model', () => {
  const Categories = categories(sequelize, dataTypes);
  const modelCategories = new Categories();

  context('Check if the categories model exists', () => {
    it('should have model valid model name (Bookmark) ', () => {
      expect(Categories.modelName).to.equal('categories');
    });
  });

  context('Check the properties of the categories Model', () => {
    it('The categories Model should have the property id', () => {
      expect(modelCategories).to.have.property('id');
    });

    it('The categories Model should have the property category', () => {
      expect(modelCategories).to.have.property('category');
    });

    context('Check the Bookmark Model associations', () => {
      before(() => {
        Categories.associate({
          Articles,
        });
      });

      it('should have a hasMany association with Artciles Model', () => {
        expect(Categories.hasMany.calledWith(Articles)).to.equal(true);
      });
    });
  });
});
