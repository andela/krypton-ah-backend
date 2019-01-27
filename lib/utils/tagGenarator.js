const TagModelManager = require('../../lib/modelManagers/tagModel');

const generateTags = async (tag, id) => {
  const tags = tag.split(',');
  tags.map(async (Eachtag) => {
    await TagModelManager.findOrCreateTag(Eachtag).then((data) => {
      data.addArticle(id);
    });
  });
};

module.exports = generateTags;
