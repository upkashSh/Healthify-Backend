const MESSAGES = {
  MISSING_PARAM: "Invalid parameter value in the request",
  SERVER_ERROR: "Internal server error", 
  INVALID_EMAIL_ADDRESS: "Please Enter Valid Email Addreess.",
  INVALID_USER: "User is not authorized",
  ALREADY_REGISTERED: "User is already registered.",
  INVALID_EMAIL_WEB_USER_ID: "Invalid email adress. Please enter valid email address.",
  INVALID_PHONE_NUMBER: "Invalid phone number. Please enter valid phone number.",
  INVALID_NAME: "Please enter valid name.",
  INVALID_PASSWORD:"Please enter valid password",
  USER_ALREADY_REGISTERED:"This email address is already registered."
};

const CODE_NUMBERS = {
  CODE_422: 422,
  CODE_403: 403,
  CODE_400: 400,
  CODE_401: 401,
  CODE_500: 500,
  CODE_502: 502,
  CODE_200: 200,
  CODE_409: 409,
  CODE_503: 503,
};

module.exports = { MESSAGES, CODE_NUMBERS };
