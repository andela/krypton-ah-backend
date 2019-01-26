const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const {
  OK_CODE,
  NOT_FOUND_CODE,
} = require('../../constants');
const { options } = require('../testHelper');

chai.use(sinonChai);

const { findOrCreateTag } = require('../../lib/modelManagers/tagModel');
const TagModelManager = require('../../lib/modelManagers/tagModel');
const filterTags = require('../../controllers/filterTagsController');
const { Tags } = require('../../database/models');
const { tag, tagArray, returnedTag } = require('../mockData');

describe('filtering article tags', () => {
  beforeEach(async () => {
    tagArray.forEach(async (element) => {
      await findOrCreateTag(element);
    });
  });
  afterEach('delete tags created', async () => {
    Tags.destroy(options);
    sinon.restore();
  });
  describe('filtering article tags', () => {
    it('should return tags that matches the input string from the user', async () => {
      const req = {
        params: {
          tag: tag.tag4
        }
      };
      const res = {
        status() {},
        json() {}
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(TagModelManager, 'getTag').returns(returnedTag);
      await filterTags(req, res);
      expect(res.status).to.have.been.calledWith(OK_CODE);
    });
  });
  describe('filtering article tags', () => {
    it('should return null if there are no tags matching the input string', async () => {
      const req = {
        params: {
          tag: tag.tag1
        }
      };
      const res = {
        status() {},
        json() {}
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(TagModelManager, 'getTag').returns([]);
      await filterTags(req, res);
      expect(res.status).to.have.been.calledWith(NOT_FOUND_CODE);
    });
  });
});
