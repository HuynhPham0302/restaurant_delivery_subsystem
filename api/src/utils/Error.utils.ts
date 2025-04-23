// Configuration of custom errors

// ErrorResponse class is the base class for all custom errors
class ErrorResponse extends Error {
  constructor(public status_code: number, public message: string, public error: any = null) {
    super(message);
    this.status_code = status_code;
    this.error = error;
  }
}

class ConflictError extends ErrorResponse {
  constructor(message: string) {
    super(409, message);
  }
}

class NotFoundError extends ErrorResponse {
  constructor(message: string) {
    super(404, message);
  }
}

class UnauthorizedError extends ErrorResponse {
  constructor(message: string) {
    super(401, message);
  }
}

class ValidatorError extends ErrorResponse {
  constructor(message: string, errors: any) {
    super(422, message, errors);
  }
}

export { ErrorResponse, ConflictError, NotFoundError, UnauthorizedError, ValidatorError };
