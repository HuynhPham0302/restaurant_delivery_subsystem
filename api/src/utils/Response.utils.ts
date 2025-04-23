export function Success<T>(metadata: T, code: number, message: string = 'Success') {
  return {
    status: 'success',
    status_code: code,
    message,
    metadata,
  };
}
