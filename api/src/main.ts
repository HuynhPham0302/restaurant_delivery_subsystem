import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response, json, urlencoded } from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
import RootRouter from './routers';
import { ErrorResponse } from './utils/Error.utils';

dotenv.config();
const app = express();
const { PORT = '3000' } = process.env;

app.use(morgan('dev'));
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors());
app.use(compression());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/v1/api/static', express.static(path.join(__dirname, '../public')));
app.use('/v1/api', RootRouter);

// Error 404 Handler
app.use((_: Request, __: Response, next: NextFunction) => {
  const err = new ErrorResponse(404, 'Not Found');
  next(err);
});

// Error 500 Handler
app.use((err: ErrorResponse, _: Request, res: Response, next: NextFunction) =>
  res.status(err.status_code || 500).json({
    status: 'error',
    status_code: err.status_code || 500,
    message: err.message || 'Internal Server Error',
    error: err.error,
  }),
);

app.listen(PORT, () => {
  console.log(`Server is ready at http://localhost:${PORT}`);
});
