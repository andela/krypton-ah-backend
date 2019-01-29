const { sequelize, dataTypes } = require('sequelize-test-helpers');

const { expect } = require('chai');

const ReadStats = require('../../database/models/readStat');

describe('Test ReadStat Model', () => {
  const readStats = ReadStats(sequelize, dataTypes);
  const readStat = new readStats();

  context('Check if the ReadStat model exists', () => {
    it('should have valid model name (ReadStat) ', () => {
      expect(readStats.modelName).to.equal('ReadStats');
    });
  });
  context('Check the properties of the ReadStat model', () => {
    it('should have the property "id"', () => {
      expect(readStat).to.have.property('id');
    });
    it('should have the property "id"', () => {
      expect(readStat).to.have.property('articleId');
    });
    it('should have the property "id"', () => {
      expect(readStat).to.have.property('readerId');
    });
    it('should have the property "id"', () => {
      expect(readStat).to.have.property('readStat');
    });
  });
});
