const { sequelize, dataTypes } = require('sequelize-test-helpers');

const { expect } = require('chai');

const User = require('../../database/models/user');
const Articles = require('../../database/models/articles');
const ReportTag = require('../../database/models/reportTags');
const Reports = require('../../database/models/reports');

describe('Test Article Model', () => {
  const reports = Reports(sequelize, dataTypes);
  const report = new reports();

  context('Check if the Articles model exists', () => {
    it('should have model valid model name (Reports) ', () => {
      expect(reports.modelName).to.equal('Reports');
    });
  });

  context('Check the properties of the Reports Model', () => {
    it('The Reports model should have the property "id"', () => {
      expect(report).to.have.property('id');
    });

    it('The Reports model should have the property "userId"', () => {
      expect(report).to.have.property('userId');
    });

    it('The Reports model should have the property "articleId"', () => {
      expect(report).to.have.property('articleId');
    });

    it('The Reports model should have the property "reportTagId"', () => {
      expect(report).to.have.property('reportTagId');
    });

    it('The Reports model should have the property "message"', () => {
      expect(report).to.have.property('message');
    });

    context('Check the report Model associations', () => {
      before(() => {
        reports.associate({
          User
        });
        reports.associate({
          Articles
        });
        reports.associate({
          ReportTag
        });
      });

      it('should have a belongsTo association with UserModel', () => {
        expect(reports.belongsTo.calledWith(User)).to.equal(true);
      });
      it('should have a belongsTo association with ArticlesModel', () => {
        expect(reports.belongsTo.calledWith(Articles)).to.equal(true);
      });
      it('should have a belongsTo association with ReportTagModel', () => {
        expect(reports.belongsTo.calledWith(ReportTag)).to.equal(true);
      });
    });
  });
});
