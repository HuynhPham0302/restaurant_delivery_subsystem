import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { json } from 'body-parser';
import router from './routers';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(json());

app.use('/api/v1,', router);

const server = app.listen(port, () => {
  console.log(`Server ready at http://localhost:${port}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated');
  });
});
