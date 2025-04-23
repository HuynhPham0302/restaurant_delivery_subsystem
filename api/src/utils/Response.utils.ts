class TRes {
  public static success<T>(metadata: T, code: number, message: string = 'Success') {
    return {
      status: 'success',
      status_code: code,
      message,
      metadata,
    };
  }

  public static error(error: any, code: number = 500, message: string = 'Internal server error') {
    return {
      status: 'error',
      status_code: code,
      message,
      error,
    };
  }
}

export default TRes;
