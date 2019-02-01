const ArticlesHighlightManager = require('../lib/modelManagers/articlesHighlightModel');

const createArticleHighlight = async (req, res, next) => {
  if (req.body.highlightedText) {
    await ArticlesHighlightManager.createArticlesHighlight(req.body);
  }
  next();
};

module.exports = createArticleHighlight;
