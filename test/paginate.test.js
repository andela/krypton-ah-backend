const { expect } = require('chai');
const query = require('./mockData');
const { LIMIT, OFFSET } = require('../constants');
const paginate = require('../lib/utils/pagination/paginationHelper');

describe('Unit test paginate', () => {
  it('should return default paginate value', async () => {
    const res = paginate(query);
    expect(res.limit).to.be.equal(LIMIT);
    expect(res.offset).to.be.equal(OFFSET - 1);
  });

  it('should return current page as limit and number of entries to be skipped as offset', async () => {
    const res = paginate(query.validquery);
    expect(res.limit).to.be.equal(query.validquery.limit);
    expect(res.offset).to.be.equal(query.validquery.limit * (query.validquery.offset - 1));
  });

  it('should return current page as limit and number of entries to be skipped as offset', async () => {
    const res = paginate(query.defaultquery);
    expect(res.limit).to.be.equal(LIMIT);
    expect(res.offset).to.be.equal(LIMIT * (OFFSET - 1));
  });

  it('should return default limit and default entries when no query is passed', async () => {
    const res = paginate(query);
    expect(res.limit).to.be.equal(LIMIT);
    expect(res.offset).to.be.equal(LIMIT * (OFFSET - 1));
  });

  it('should return default limit and default entries when no query parameters are not integers', async () => {
    const res = paginate(query.NaNquery);
    expect(res.limit).to.be.equal(LIMIT);
    expect(res.offset).to.be.equal(LIMIT * (OFFSET - 1));
  });

  it('should return default limit and default entries when negative query parameters are passed', async () => {
    const res = paginate(query.negativequery);
    expect(res.limit).to.be.equal(LIMIT);
    expect(res.offset).to.be.equal(LIMIT * (OFFSET - 1));
  });
});
