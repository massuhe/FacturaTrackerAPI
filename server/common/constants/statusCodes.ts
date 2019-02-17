enum STATUS_CODES {
  /* Success status codes */
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  /* Client errors status codes */
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  /* Server errors status codes */
  INTERNAL_SERVER_ERROR = 500
}

export default STATUS_CODES