const sinon = require('sinon');
const { expect } = require('chai');
const {
    articleByAuthorWhere,
    articleByTitleWhere,
    articleByTagWhere,
    articleBykeywordWhere,
    searchResult
  } = require('../../lib/utils/helpers'),
  {
    fakeUser, tag, newArticle, emptyArray, sampleFoundArticle
  } = require('../mockData'),
  { res } = require('../testHelper'),
  { OK_CODE } = require('../../constants');

describe('article search where clause', () => {
  it('should return the where object for searching article by author single name', () => {
    expect(articleByAuthorWhere(fakeUser.fname)).to.be.an('Object');
  });

  it('should return the where object for searching article by author both names', () => {
    const authorName = `${fakeUser.fname} ${fakeUser.lname}`;
    expect(articleByAuthorWhere(authorName)).to.be.an('Object');
  });

  it('should return the where object for searching article by title', () => {
    expect(articleByTitleWhere(newArticle.title)).to.be.an('Object');
  });

  it('should return the where object for searching article by tag', () => {
    expect(articleByTagWhere(tag.tag1)).to.be.an('Object');
  });

  it('should return the where object for searching article by keyword', () => {
    expect(articleBykeywordWhere(tag.tag1)).to.be.an('Object');
  });
});

describe('article search result', () => {
  afterEach(sinon.restore);
  it('should not return any article if the search parameter does not match any article', () => {
    sinon.stub(res, 'status').returnsThis();
    searchResult(emptyArray, res);
    expect(res.status).to.have.been.calledWith(OK_CODE);
  });

  it('should return with articles that match the search parameters', () => {
    sinon.stub(res, 'status').returnsThis();
    searchResult(sampleFoundArticle, res);
    expect(res.status).to.have.been.calledWith(OK_CODE);
  });
});
