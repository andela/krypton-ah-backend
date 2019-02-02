const ArticlesHighlightManager = require('../lib/modelManagers/articlesHighlightModel');

const createArticleHighlight = async (req) => {
  if (req.body.highlightedText) {
    await ArticlesHighlightManager.createArticlesHighlight(req.body);
  }
};

module.exports = createArticleHighlight;
