import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { json } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import RootRouter from './routers';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(json());

app.use('/v1/api', RootRouter);

app.listen(port, () => {
  console.log(`Server is ready at http://localhost:${port}`);
});
