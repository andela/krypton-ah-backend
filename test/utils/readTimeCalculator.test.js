const { expect } = require('chai'),
  readTimeCalculator = require('../../lib/utils/readTimeCalculator'),
  { contents } = require('../mockData');

describe('readTimeCalculator', () => {
  it('should calculate the read time', () => {
    expect(readTimeCalculator(contents.words200)).to.equal(1);
    expect(readTimeCalculator(contents.words400)).to.equal(2);
    expect(readTimeCalculator(contents.words1000)).to.equal(5);
  });
});
