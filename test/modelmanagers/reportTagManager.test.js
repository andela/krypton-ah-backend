const { expect } = require('chai'),
  ReportTagModelManager = require('../../lib/modelManagers/reportTagModel');

let res, tagId;
describe('Test report tag Manager', () => {
  it('should create a report tag', async () => {
    res = await ReportTagModelManager.createReportTag('Techn');
    tagId = res.dataValues.id;
    expect(res).to.be.an('object');
    expect(res.dataValues).to.haveOwnProperty('id');
    expect(res.dataValues).to.haveOwnProperty('name');
  });

  it('should get all report tags', async () => {
    res = await ReportTagModelManager.getAllReportTags();
    expect(res).to.be.an('array');
    expect(res[0].dataValues).to.haveOwnProperty('id');
    expect(res[0].dataValues).to.haveOwnProperty('name');
  });

  it('should delete a report tag', async () => {
    res = await ReportTagModelManager.deleteTag(tagId);
    expect(res).to.be.equal(1);
  });
});
