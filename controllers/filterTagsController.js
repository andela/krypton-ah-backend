const TagModelManager = require('../lib/modelManagers/tagModel');
const { successResponse, failureResponse } = require('../lib/utils/helper_function');
const {
  FOUND_TAGS_MESSAGE,
  TAGS_NOT_FOUND,
  NOT_FOUND_CODE
} = require('../constants');

const filterTags = async (req, res) => {
  const { tag } = req.params;
  const foundTags = await TagModelManager.getTag(tag);
  if (foundTags.length === 0) {
    return failureResponse(res, TAGS_NOT_FOUND, NOT_FOUND_CODE, foundTags);
  }
  const matchingTags = foundTags.map(tags => tags.dataValues.tagName);
  return successResponse(res, FOUND_TAGS_MESSAGE, matchingTags);
};
module.exports = filterTags;
