class TResponse {
  public static success<T>(metadata: T, code: number, message: string = 'Success') {
    return {
      status: 'success',
      status_code: code,
      message,
      metadata,
    };
  }

  public static error(message: string = 'Error', data: any = null) {
    return {
      status: 'error',
      message,
      data,
    };
  }
}

export default TResponse;
