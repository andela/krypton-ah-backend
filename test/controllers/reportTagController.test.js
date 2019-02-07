const chaiHttp = require('chai-http'),
  chai = require('chai'),
  sinon = require('sinon'),
  { expect } = require('chai'),
  ReportTagController = require('../../controllers/reportTagController'),
  ReportTagModelManager = require('../../lib/modelManagers/reportTagModel'),
  ReportModelManager = require('../../lib/modelManagers/reportModel'),
  user = require('../../database/models').User,
  Article = require('../../lib/modelManagers/articlemodel'),
  { createReportTag } = require('../../lib/modelManagers/reportTagModel'),
  {
    RESOURCE_CREATED_CODE,
    REPORT_TAG_CREATED,
    OK_CODE,
    SERVER_ERROR_CODE,
    SERVER_ERROR_MESSAGE,
    RETRIEVED_REPORT_TAG,
    CONFLICT_CODE,
    TAG_ALREADY_EXIST,
    BAD_REQUEST_CODE,
    NOT_FOUND_CODE
  } = require('../../constants/index'),
  { Reports } = require('../../database/models'),
  { ReportTag } = require('../../database/models'),
  {
    reportTagName, dummyReport, userdata, article
  } = require('../mockData');

chai.use(chaiHttp);


let tagId,
  res,
  report,
  userid,
  articleId;

describe('Test report tag controller', () => {
  before('Delete Table report Tag', async () => {
    await ReportTagModelManager.createReportTag('technologies');
    await Reports.destroy({
      where: {}
    });
    await user.destroy({
      where: {}
    });
    await ReportTag.destroy({
      where: {}
    });


    res = await user.create(userdata);
    userid = res.dataValues.id;
    const testArticle = article(userid);
    const articleRes = await Article.createArticle(testArticle);
    const createTag = await createReportTag('isaiah');
    articleId = articleRes.dataValues.id;
    tagId = createTag.dataValues.id;
    report = dummyReport(userid, articleId, tagId);
    await ReportModelManager.createReport(report);
  });
  after('Delete Table report Tag', async () => {
    await ReportTag.destroy({
      where: {}
    });
  });

  afterEach(sinon.restore);

  it('should create a report tag', async () => {
    const req = {
      body: {
        name: reportTagName,
      }
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await ReportTagController.createTag(req, res);
    expect(res.status).to.have.been.calledWith(RESOURCE_CREATED_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(true);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('data').be.an('object');
    expect(res.json.firstCall.lastArg.data).to.haveOwnProperty('dataValues').be.an('object');
    expect(res.json.firstCall.lastArg.data.dataValues).to.haveOwnProperty('id');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(REPORT_TAG_CREATED);
    tagId = res.json.firstCall.lastArg.data.dataValues.id;
  });

  it('should return error if name is not available', async () => {
    const req = {
      body: {
        named: reportTagName
      }
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await ReportTagController.createTag(req, res);
    expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(SERVER_ERROR_MESSAGE);
  });

  it('should return all report tags', async () => {
    const req = {
      query: {
        limit: 5,
        offset: 0
      }
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await ReportTagController.getTags(req, res);
    expect(res.status).to.have.been.calledWith(OK_CODE);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(RETRIEVED_REPORT_TAG);
    expect(res).to.be.an('object');
  });

  it('should return server error, if tag name exist', async () => {
    const req = {
      body: {
        name: reportTagName
      }
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await ReportTagController.createTag(req, res);
    expect(res.status).to.have.been.calledWith(CONFLICT_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(TAG_ALREADY_EXIST);
  });

  it('should delete a tag', async () => {
    const req = {
      params: {
        tagId
      }
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await ReportTagController.deleteReportTag(req, res);
    expect(res.status).to.have.been.calledWith(OK_CODE);
  });

  it('should return error, if report tag id doesnt exist', async () => {
    const req = {
      params: {
        tagId: 'f0617b09-6e26-4fd1-9fec-c6e1fd110454'
      }
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await ReportTagController.deleteReportTag(req, res);
    expect(res.status).to.have.been.calledWith(NOT_FOUND_CODE);
  });

  it('should return error, if report tag id is in used', async () => {
    const req = {
      params: {
        tagId
      }
    };

    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');


    sinon.stub(ReportModelManager, 'getNumberOfReportTag');
    await ReportTagController.deleteReportTag(req, res);
    expect(res.status).to.have.been.calledWith(BAD_REQUEST_CODE);
  });
  it('should return server error, if server is down "create Tag"', async () => {
    const req = {
      body: {
        name: { }
      }
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await ReportTagController.createTag(req, res);
    expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
    expect(res.json.firstCall.lastArg).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('success').equal(false);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(SERVER_ERROR_MESSAGE);
  });

  it('should return an error "Get Tags"', async () => {
    const req = {
      query: {
        limit: 0,
        offset: 0
      }
    };

    const res = {
      status() {},
      json() { }
    };

    sinon.stub(res, 'status').returnsThis();
    sinon.spy(res, 'json');

    sinon.stub(ReportTagModelManager, 'getAllReportTags').throws();
    await ReportTagController.getTags(req, res);

    expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
    expect(res).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(SERVER_ERROR_MESSAGE);
    sinon.restore();
  });
  it('should return an server error, if unable to get report tags', async () => {
    const req = {
      params: {
        tagId: 'd996e18e-bf81-4f08-93df-56ab99ffd1ed'
      }
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    sinon.stub(ReportTagModelManager, 'deleteTag').throws();
    await ReportTagController.deleteReportTag(req, res);
    expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
    expect(res).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(SERVER_ERROR_MESSAGE);
    sinon.restore();
  });
});
