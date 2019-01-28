const { validateComment, validateUUID } = require('./validate'),
  { failureResponse } = require('../utils/messageHandler'),
  messageFormatter = require('./messageFormatter'),
  { BAD_REQUEST_CODE } = require('../../constants/index');

const commentValidator = (req, res, next) => {
  const { mainCommentId } = req.body;
  validateComment(req);
  if (mainCommentId) {
    validateUUID(req, 'mainCommentId');
  }
  const errors = req.validationErrors();

  if (errors) {
    const errorMessages = errors.map(err => err.msg);
    return failureResponse(res, messageFormatter(errorMessages), BAD_REQUEST_CODE);
  }
  next();
};
module.exports = commentValidator;
