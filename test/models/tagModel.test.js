const { sequelize, dataTypes } = require('sequelize-test-helpers');

const { expect } = require('chai');

const Tag = require('../../database/models/tags');
const Articles = require('../../database/models/articles');

describe('Test Tag Model', () => {
  const tags = Tag(sequelize, dataTypes);
  const tag = new tags();

  context('Check if the tag model exists', () => {
    it('should have valid model name (Tags) ', () => {
      expect(tags.modelName).to.equal('Tags');
    });
  });

  context('Check the properties of the tag model', () => {
    it('should have the property "tagname"', () => {
      expect(tag).to.have.property('tagName');
    });
  });

  context('Check the tag Model associations', () => {
    before(() => {
      tags.associate({
        Articles,
      });
    });

    it('should have a belongsToMany association with articleModel', () => {
      expect(tags.belongsToMany.calledWith(Articles)).to.equal(true);
    });
  });
});
