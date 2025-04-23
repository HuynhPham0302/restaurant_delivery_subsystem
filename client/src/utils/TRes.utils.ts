export type TResponse<T> = {
  status: string;
  status_code: number;
  message: string;
  metadata: T;
};
