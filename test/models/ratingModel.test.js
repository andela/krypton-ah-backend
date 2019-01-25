const { sequelize, dataTypes } = require('sequelize-test-helpers');

const { expect } = require('chai');

const User = require('../../database/models/user');
const Articles = require('../../database/models/articles');
const Rating = require('../../database/models/articleRating');

describe('Test Article Rating Model', () => {
  const ratings = Rating(sequelize, dataTypes);
  const rating = new ratings();

  context('Check if the Article Rating model exists', () => {
    it('should have model valid model name (Rating) ', () => {
      expect(ratings.modelName).to.equal('Rating');
    });
  });

  context('Check the properties of the Article Rating Model', () => {
    it('The Article Rating Model should have the property rating', () => {
      expect(rating).to.have.property('rating');
    });

    context('Check the Article Rating Model associations', () => {
      before(() => {
        ratings.associate({
          User,
        });
      });

      it('should have a belongsTo association with User Model', () => {
        expect(ratings.belongsTo.calledWith(User)).to.equal(true);
      });
    });

    context('Check the rating Model associations', () => {
      before(() => {
        ratings.associate({
          Articles,
        });
      });

      it('should have a belongsTo association with Articles Model', () => {
        expect(ratings.belongsTo.calledWith(Articles)).to.equal(true);
      });
    });
  });
});
