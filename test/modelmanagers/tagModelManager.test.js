const { expect } = require('chai');
const { tag } = require('../mockData');
const { findOrCreateTag, getTag } = require('../../lib/modelManagers/tagModel');

describe('create article tag', () => {
  let createdTag;
  before(async () => {
    createdTag = await findOrCreateTag(tag.tag2);
  });
  it('should confirm that the created tagname is equal to JavaScript', async () => {
    expect(createdTag.dataValues.tagName).to.equal('JavaScript');
  });

  it('should get tags in the tag table that contains matching string', async () => {
    const foundTag = await getTag('Script');
    expect(foundTag[0].dataValues.tagName).to.equal(tag.tag2);
  });

  it('should return null when there is none with the matching string', async () => {
    const foundTag = await getTag('come');
    expect(foundTag).to.eql([]);
  });
});
