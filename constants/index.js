const mocks = require('./mocks');

const BAD_REQUEST_CODE = 400,
  UNAUTHORIZED_CODE = 401,
  OK_CODE = 200,
  RESOURCE_CREATED_CODE = 201,
  NOT_FOUND_CODE = 404,
  CONFLICT_CODE = 409,
  SERVER_ERROR_CODE = 500,
  UNSUCCESSFUL = false,
  SUCCESSFUL = true,
  LIMIT = 15,
  OFFSET = 1,
  RESET_REACTION = 'Reaction removed successfully',
  SUBJECT = 'Welcome to Authors Haven! Verify Your Email',
  FROM = 'no-reply@authorshaven.com',
  UNAUTHORIZED_REQUEST = 'Unauthorized request',
  JWT_EXPIRED = 'The token provided has expired',
  JWT_MALFORMED = 'Wrong token provided or Invalid signature',
  TOKEN_TIMESPAN = '1d',
  SERVER_ERROR_MESSAGE = 'Ooops! Something went wrong, kindly try again',
  ACCOUNT_CREATED = 'Account successfully created, Kindly check your email to activate your account',
  ALREADY_ACTIVATED_ERROR = 'Account is already activated',
  ACCOUNT_ACTIVATED = 'Your Account is Now Activated!',
  INVALID_USER = 'Invalid user',
  WELCOME_NEW_USER = 'Welcome!',
  WELCOME_EXISTING_USER = 'Welcome back',
  INVALID_EMAIL = 'email must be valid',
  EMAIL_ALREADY_EXIST = 'email already exist',
  USER_RETRIEVAL_SUCCESS_MESSAGE = 'users retrieved succesfully',
  SERVER_RETRIEVAL_MESSAGE = 'There as been an error somewhere,please try again!',
  SERVER_ERROR = 'Ooops! Something went wrong, kindly try again',
  USER_EMAIL = 'email',
  RESET_LINK_EXPIRE = '30min',
  EMAIL_NOT_FOUND = 'Email does not exist',
  RESET_LINK_SENT = 'Reset link sent succesfully',
  RESET_LINK_NOT_SENT = 'Reset link not sent',
  EXPIRED_RESET_LINK = 'Reset Link Expired',
  INVALID_RESET_LINK = 'Reset Link Invalid',
  VALID_RESET_LINK = 'Reset Link Valid',
  RESET_LINK_URL = `${process.env.APP_BASE_URL}/api/v1/users/resetpassword/`,
  UUID = 'ad94832a-19cf-11e9-ab14-d663bd873d45',
  RESET_LINK_SUBJECT = 'Reset Password - Authors Haven',
  BAD_TOKEN = '84ruyhf9q38uyg9',
  ID_REQUIRED = 'userId is required',
  CREATE_USER_PROFILE_SUCCESS_MESSAGE = 'User profile created successfully',
  UPDATE_USER_PROFILE_SUCCESS_MESSAGE = 'User profile updated successfully',
  CREATE_USER_PROFILE_ERROR_MESSAGE = 'Error creating user profile',
  UPDATE_USER_PROFILE_ERROR_MESSAGE = 'Error updating user profile',
  VALIDATE_GENDER_ERROR = 'gender must either be a male or female',
  VALIDATE_EMAIL_NOTIFICATION_ERROR = 'emailnotification must be true or false',
  VALIDATE_USERNAME_ERROR = 'username must be letters with min of 2 characters',
  VALIDATE_URL_ERROR = 'must be valid',
  VALIDATE_PHONENUMBER_ERROR = "phonenumber must be a valid phone number that starts with '+'",
  VALIDATE_ARTICLE_CONTENT_ERROR = 'content is required',
  isRequiredError = fieldName => `${fieldName} is required`,
  booleanError = fieldName => `${fieldName} must either be true or false`,
  GET_USER_RATING = 'Get user rating successfully',
  GET_USER_RATING_ERROR = 'One or both of articleId and userId not found',
  RATING_CREATED = 'Your rating have been saved succesfully',
  COMMENT_NOT_FOUND = 'Comment does not exist',
  INVALID_REACTION_ID = 'Invalid reaction Id',
  REACTION_STATUS = 'You have successfully d this comment',
  COMMENT_REACTION = 'comment reaction can only be "true" or "false"',
  LIKE = 'like',
  SEQUELIZE_ERROR = 'SequelizeDatabaseError',
  SEQUELIZE_FK_ERROR = 'SequelizeForeignKeyConstraintError',
  REACTIONS = ['like', 'dislike'],
  ALREADY_FOLLOWING_AUTHOR = 'You are already following this author',
  FOLLOW_SELF = 'You cannot follow yourself',
  NOW_FOLLOWING_USER = 'You are now following this author',
  UNFOLLOW_USER_MESSAGE = 'You have successfully unfollowed this Author',
  UNFOLLOW_SELF = 'You cannot unfollow yourself',
  NOT_FOUND_CODE_MESSAGE = 'User not found',
  NO_FOLLOWING = 'You are currently not following any user',
  NO_FOLLOWER = 'You currently don\'t have a follower',
  MY_FOLLOWEES = 'My Followers',
  MY_FOLLOWERS = 'Following',
  UNAUTHORIZED_CODE_MESSAGE = 'You are not authorised to view this. Please sign up',
  INVALID_TAG_NAME = 'Tags can only start with a number, an alphabet or the # symbol',
  FOUND_TAGS_MESSAGE = 'Below are the matching tags',
  TAGS_NOT_FOUND = 'No tags with the matching string',
  VALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNDE1ZTJlZmEtMTllNy0xMWU5LWFiMTQtZDY2M2JkODczZDkzIiwiaWF0IjoxNTQ3ODIxMjk2LCJleHAiOjE1NDc5MDc2OTZ9.DVwT7E9aU92ByHEw7GNn8URI-iZAR2VCLIY47dilOec';

module.exports = {
  FROM,
  SUBJECT,
  REACTIONS,
  LIMIT,
  REACTION_STATUS,
  UNAUTHORIZED_REQUEST,
  OFFSET,
  BAD_REQUEST_CODE,
  UNAUTHORIZED_CODE,
  RESET_REACTION,
  COMMENT_REACTION,
  OK_CODE,
  RESOURCE_CREATED_CODE,
  NOT_FOUND_CODE,
  CONFLICT_CODE,
  SERVER_ERROR_CODE,
  UNSUCCESSFUL,
  SUCCESSFUL,
  TOKEN_TIMESPAN,
  JWT_MALFORMED,
  JWT_EXPIRED,
  SERVER_ERROR_MESSAGE,
  ACCOUNT_CREATED,
  ACCOUNT_ACTIVATED,
  ALREADY_ACTIVATED_ERROR,
  INVALID_USER,
  WELCOME_NEW_USER,
  WELCOME_EXISTING_USER,
  INVALID_EMAIL,
  SEQUELIZE_ERROR,
  COMMENT_NOT_FOUND,
  EMAIL_ALREADY_EXIST,
  USER_RETRIEVAL_SUCCESS_MESSAGE,
  SERVER_RETRIEVAL_MESSAGE,
  SERVER_ERROR,
  USER_EMAIL,
  RESET_LINK_EXPIRE,
  EMAIL_NOT_FOUND,
  RESET_LINK_SENT,
  RESET_LINK_NOT_SENT,
  EXPIRED_RESET_LINK,
  INVALID_RESET_LINK,
  VALID_RESET_LINK,
  RESET_LINK_URL,
  UUID,
  RESET_LINK_SUBJECT,
  BAD_TOKEN,
  ID_REQUIRED,
  SEQUELIZE_FK_ERROR,
  INVALID_REACTION_ID,
  ...mocks,
  CREATE_USER_PROFILE_SUCCESS_MESSAGE,
  UPDATE_USER_PROFILE_SUCCESS_MESSAGE,
  CREATE_USER_PROFILE_ERROR_MESSAGE,
  UPDATE_USER_PROFILE_ERROR_MESSAGE,
  VALIDATE_EMAIL_NOTIFICATION_ERROR,
  VALIDATE_GENDER_ERROR,
  VALIDATE_PHONENUMBER_ERROR,
  VALIDATE_URL_ERROR,
  VALIDATE_USERNAME_ERROR,
  VALIDATE_ARTICLE_CONTENT_ERROR,
  isRequiredError,
  booleanError,
  GET_USER_RATING,
  GET_USER_RATING_ERROR,
  RATING_CREATED,
  LIKE,
  ALREADY_FOLLOWING_AUTHOR,
  FOLLOW_SELF,
  NOW_FOLLOWING_USER,
  UNFOLLOW_USER_MESSAGE,
  UNFOLLOW_SELF,
  NOT_FOUND_CODE_MESSAGE,
  NO_FOLLOWING,
  NO_FOLLOWER,
  MY_FOLLOWEES,
  MY_FOLLOWERS,
  UNAUTHORIZED_CODE_MESSAGE,
  INVALID_TAG_NAME,
  FOUND_TAGS_MESSAGE,
  TAGS_NOT_FOUND,
  VALID_TOKEN
};
