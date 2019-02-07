const { expect } = require('chai'),
  {
    reportTagName,
    userdata,
    article,
    dummyReport
  } = require('../mockData'),
  user = require('../../database/models').User,
  Article = require('../../lib/modelManagers/articlemodel'),
  { createReportTag } = require('../../lib/modelManagers/reportTagModel'),
  ReportModelManager = require('../../lib/modelManagers/reportModel');

let res, report, reportId;
describe('Report Tag Manager', () => {
  before(async () => {
    res = await user.create(userdata);
    const userid = res.dataValues.id;
    const testArticle = article(userid);
    const articleRes = await Article.createArticle(testArticle);
    const createTag = await createReportTag(reportTagName);
    const articleId = articleRes.dataValues.id;
    const tagId = createTag.dataValues.id;
    report = dummyReport(userid, articleId, tagId);
  });

  it('should create a report', async () => {
    res = await ReportModelManager.createReport(report);
    reportId = res.dataValues.id;
    expect(res).to.be.an('object');
    expect(res.dataValues).to.haveOwnProperty('id');
    expect(res.dataValues).to.haveOwnProperty('userId');
    expect(res.dataValues).to.haveOwnProperty('articleId');
    expect(res.dataValues).to.haveOwnProperty('reportTagId');
    expect(res.dataValues).to.haveOwnProperty('message');
  });

  it('should be a string', () => {
    expect(res.dataValues.message).to.be.a('string');
  });

  it('should return an error, when message length is less than 3 characters', () => {
    expect(res.dataValues.message).to.have.length.above(3);
  });

  it('should return all reports', async () => {
    res = await ReportModelManager.getAllReports();
    expect(res).to.be.an('array');
    expect(res[0].dataValues).to.haveOwnProperty('id');
    expect(res[0].dataValues.reporter).to.be.an('object');
    expect(res[0].dataValues.tag).to.be.an('object');
    expect(res[0].dataValues.reporter.dataValues).to.haveOwnProperty('lastname');
    expect(res[0].dataValues.reporter.dataValues).to.haveOwnProperty('firstname');
    expect(res[0].dataValues.tag.dataValues).to.haveOwnProperty('name');
  });

  it('should return a single report', async () => {
    res = await ReportModelManager.getReportById(reportId);
    expect(res).to.be.an('object');
    expect(res.dataValues).to.haveOwnProperty('id');
    expect(res.dataValues.reporter).to.be.an('object');
    expect(res.dataValues.userArticle).to.be.an('object');
    expect(res.dataValues.tag).to.be.an('object');
    expect(res.dataValues.reporter.dataValues).to.haveOwnProperty('lastname');
    expect(res.dataValues.reporter.dataValues).to.haveOwnProperty('firstname');
    expect(res.dataValues.userArticle.dataValues).to.haveOwnProperty('title');
    expect(res.dataValues.userArticle.dataValues).to.haveOwnProperty('content');
    expect(res.dataValues.tag.dataValues).to.haveOwnProperty('name');
  });

  it('should update a report', async () => {
    res = await ReportModelManager.updateReport(reportId);
    expect(res).to.be.an('array');
  });
});
