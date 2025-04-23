import { ZodObject } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { ValidatorError } from './Error.utils';

const ValidationData = async <T>(data: T, schema: ZodObject<any, any>): Promise<T> =>
  schema
    .parseAsync(data)
    .then(() => data)
    .catch((error) => {
      throw new ValidatorError(fromZodError(error).toString(), error.errors);
    });

export { ValidationData };
