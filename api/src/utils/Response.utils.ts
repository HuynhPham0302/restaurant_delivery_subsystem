class TRes {
  public static success<T>(metadata: T, code: number, message: string = 'Success') {
    return {
      status: 'success',
      status_code: code,
      message,
      metadata,
    };
  }

  public static error(message: string = 'Server Error', code: number = 500, metadata: any = null) {
    return {
      status: 'error',
      status_code: code,
      message,
      metadata,
    };
  }
}

export default TRes;
