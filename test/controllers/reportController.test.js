const chaiHttp = require('chai-http'),
  chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  { expect } = require('chai'),
  ReportController = require('../../controllers/reportController'),
  ReportModelManager = require('../../lib/modelManagers/reportModel'),
  {
    OK_CODE,
    SERVER_ERROR_CODE,
    SERVER_ERROR_MESSAGE,
    RESOLVED_REPORT,
    NOT_FOUND_CODE,
    NO_REPORT_FOUND,
    REPORT_REOPEN,
    UPDATE_ERROR_MESSAGE
  } = require('../../constants/index'),
  { Reports } = require('../../database/models'),
  { ReportTag } = require('../../database/models'),
  user = require('../../database/models').User,
  Article = require('../../lib/modelManagers/articlemodel'),
  { createReportTag } = require('../../lib/modelManagers/reportTagModel'),
  {
    userdata,
    reportTagName,
    article,
    dummyReport,
  } = require('../mockData');

let tagId;

chai.use(chaiHttp);
chai.use(sinonChai);

let res, report, userid, message, articleId, reportId;

describe('Test report controller', () => {
  after('Delete Table report', async () => {
    await Reports.destroy({
      where: {}
    });
    await user.destroy({
      where: {}
    });
    await ReportTag.destroy({
      where: {}
    });
  });
  before(async () => {
    res = await user.create(userdata);
    userid = res.dataValues.id;
    const testArticle = article(userid);
    const articleRes = await Article.createArticle(testArticle);
    const createTag = await createReportTag(reportTagName);
    articleId = articleRes.dataValues.id;
    tagId = createTag.dataValues.id;
    report = dummyReport(userid, articleId, tagId);
  });

  afterEach(sinon.restore);


  it('should return an error ', async () => {
    const reportTagId = tagId;
    const payLoad = userid;
    ({ message } = report);
    const req = {
      body: {
        reportTagId,
        message
      },
      params: {
        articleId
      },
      decodedToken: {
        payLoad
      }
    };

    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    sinon.stub(ReportModelManager, 'createReport').throws();
    await ReportController.createAReport(req, res);

    expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
    expect(res).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(SERVER_ERROR_MESSAGE);
    sinon.restore();
  });

  it('should create a report', async () => {
    const reportTagId = tagId;
    const payLoad = userid;
    ({ message } = report);
    const req = {
      body: {
        reportTagId,
        message
      },
      params: {
        articleId
      },
      decodedToken: {
        payLoad
      }
    };

    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await ReportController.createAReport(req, res);
    reportId = res.json.firstCall.lastArg.data.dataValues.id;
  });

  it('should resolved a report', async () => {
    const payLoad = userid;
    const req = {
      params: {
        id: reportId
      },
      body: {
        resolved: true
      },
      decodedToken: {
        payLoad
      }
    };

    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await ReportController.resolveReport(req, res);
    expect(res.status).to.have.been.calledWith(OK_CODE);
    expect(res).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(RESOLVED_REPORT);
    sinon.restore();
  });

  it('should return server error, if it unable to resolve report', async () => {
    const payLoad = userid;
    const req = {
      params: {
        id: 'd996e18e-bf81-4f08-56ab99ffd1ed'
      },
      body: {
        resolved: ''
      },
      decodedToken: {
        payLoad
      }
    };

    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');
    await ReportController.resolveReport(req, res);
    expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(SERVER_ERROR_MESSAGE);
    sinon.restore();
  });

  it('should return all report', async () => {
    const req = {
      query: {
        limit: 5,
        offset: 1
      }
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await ReportController.getReports(req, res);
    expect(res.status).to.have.been.calledWith(OK_CODE);
    expect(res).to.be.an('object');
  });

  it('should return single report', async () => {
    const req = {
      params: {
        id: reportId
      }
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await ReportController.getReport(req, res);
    expect(res.status).to.have.been.calledWith(OK_CODE);
    expect(res).to.be.an('object');
  });

  it('should return an error, if Id is not valid', async () => {
    const req = {
      params: {
        id: 12345678987
      }
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    await ReportController.getReport(req, res);
    expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
    expect(res).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(SERVER_ERROR_MESSAGE);
  });

  it('should return an server error, if unable to get reports', async () => {
    const req = {
      query: {
        limit: 0,
        offset: 0
      }
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    sinon.stub(ReportModelManager, 'getAllReports').throws();
    await ReportController.getReports(req, res);
    expect(res.status).to.have.been.calledWith(SERVER_ERROR_CODE);
    expect(res).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(SERVER_ERROR_MESSAGE);
    sinon.restore();
  });

  it('should return an error, if Id doesnt exist "ResolveReport"', async () => {
    before('Delete all reports', async () => {
      await Reports.destroy({
        where: {}
      });
    });

    const req = {
      params: {
        id: 'aab80e5f-dab9-4fa6-9cb4-bfce9dbf6f18'
      },
      body: {
        resolved: true
      }
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    sinon.stub(ReportModelManager, 'updateReport').returns(false);
    await ReportController.resolveReport(req, res);
    expect(res.status).to.have.been.calledWith(NOT_FOUND_CODE);
    expect(res).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(UPDATE_ERROR_MESSAGE);
    sinon.restore();
  });

  it('should return an error, if reopen the report', async () => {
    const req = {
      params: {
        id: 'aab80e5f-dab9-4fa6-9cb4-bfce9dbf6f18'
      },
      body: {
        resolved: false
      }
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    sinon.stub(ReportModelManager, 'updateReport').returns(true);
    await ReportController.resolveReport(req, res);
    expect(res.status).to.have.been.calledWith(OK_CODE);
    expect(res).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(REPORT_REOPEN);
    sinon.restore();
  });

  it('should return an error, if it cannot get report by id "getReport"', async () => {
    before('Delete all reports', async () => {
      await Reports.destroy({
        where: {}
      });
    });

    const req = {
      params: {
        id: 'aab80e5f-dab9-4fa6-9cb4-bfce9dbf6f18'
      }
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    sinon.stub(ReportModelManager, 'getReportById').returns(false);
    await ReportController.getReport(req, res);
    expect(res.status).to.have.been.calledWith(NOT_FOUND_CODE);
    expect(res).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(NO_REPORT_FOUND);
  });

  it('should return an error, if it cannot get report by id "getReport"', async () => {
    before('Delete all reports', async () => {
      await Reports.destroy({
        where: {}
      });
    });

    const req = {
      params: {
        id: 'aab80e5f-dab9-4fa6-9cb4-bfce9dbf6f18'
      },
      query: {
        limit: 0,
        offset: 0
      }
    };
    const res = {
      status() { return this; },
      json() { }
    };

    sinon.spy(res, 'status');
    sinon.spy(res, 'json');

    sinon.stub(ReportModelManager, 'getAllReports').returns(false);
    await ReportController.getReports(req, res);
    expect(res.status).to.have.been.calledWith(NOT_FOUND_CODE);
    expect(res).to.be.an('object');
    expect(res.json.firstCall.lastArg).to.haveOwnProperty('message').equal(NO_REPORT_FOUND);
  });
});
