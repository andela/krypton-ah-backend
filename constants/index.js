const FROM = 'no-reply@authorshaven.com',
  SUBJECT = 'Welcome to Authors Haven! Verify Your Email',
  BAD_REQUEST_CODE = 400,
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
  NO_TOKEN_PROVIDED = 'No token provided',
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
  SERVER_RETRIEVAL_MESSAGE = 'There as been an error somewhere,please try again!';

module.exports = {
  FROM,
  SUBJECT,
  LIMIT,
  OFFSET,
  BAD_REQUEST_CODE,
  UNAUTHORIZED_CODE,
  OK_CODE,
  RESOURCE_CREATED_CODE,
  NOT_FOUND_CODE,
  CONFLICT_CODE,
  SERVER_ERROR_CODE,
  UNSUCCESSFUL,
  SUCCESSFUL,
  TOKEN_TIMESPAN,
  NO_TOKEN_PROVIDED,
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
  EMAIL_ALREADY_EXIST,
  USER_RETRIEVAL_SUCCESS_MESSAGE,
  SERVER_RETRIEVAL_MESSAGE
};
