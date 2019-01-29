const { sequelize, dataTypes } = require('sequelize-test-helpers');

const { expect } = require('chai');

const ReportTags = require('../../database/models/reportTags');

describe('Test articleTag Model', () => {
  const reportTags = ReportTags(sequelize, dataTypes);
  const reportTag = new reportTags();

  context('Check if the reportTag model exists', () => {
    it('should have valid model name (ReportTags) ', () => {
      expect(reportTags.modelName).to.equal('ReportTag');
    });
  });

  context('Check the properties of the reportTag model', () => {
    it('should have the property "id"', () => {
      expect(reportTag).to.have.property('id');
    });
  });
  context('Check the properties of the reportTag model', () => {
    it('should have the property "name"', () => {
      expect(reportTag).to.have.property('name');
    });
  });
});
