const TagModelManager = require('../../lib/modelManagers/tagModel');
const { ArticleTags } = require('../../database/models');

const generateTags = async (tag, id) => {
  const tags = tag.split(',');
  const keys = Array.from(Object.values(tags));
  keys.map(async (ta) => {
    await TagModelManager.findOrCreateTag(ta).then((data) => {
      ArticleTags.create({
        articleId: id,
        tagId: data.dataValues.id,
      });
    });
  });
};

module.exports = generateTags;
