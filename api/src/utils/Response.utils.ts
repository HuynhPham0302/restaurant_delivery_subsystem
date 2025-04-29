export function Success<T>(metadata: T, total: number | null, code: number, message: string = 'Success') {
  return {
    status: 'success',
    status_code: code,
    message,
    metadata,
    total,
  };
}

export type Filter = {
  page: number;
  limit: number;
  order: string;
  sort: string;
  [key: string]: string | number;
};

function convertStringNumbers(obj: Record<string, any>): Record<string, any> {
  const entries = Object.entries(obj).map(([key, value]) => {
    if (typeof value === 'string' && !isNaN(parseFloat(value)) && isFinite(value as any)) {
      return [key, parseFloat(value)];
    }
    return [key, value];
  });
  return Object.fromEntries(entries);
}

export const dataFilter = (query: any) => {
  const filter: Filter = {
    page: Number(query.page) || 1,
    limit: Number(query.limit) || 10,
    order: query.order || 'createdAt',
    sort: query.sort || 'desc',
  };
  delete query.page;
  delete query.limit;
  delete query.order;
  delete query.sort;

  return { filter, query: convertStringNumbers(query) };
};
