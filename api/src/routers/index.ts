import { Router } from 'express';
import AuthRouter from './Auth.routers';

const RootRouter = Router();

RootRouter.use('/auth', AuthRouter);

export default RootRouter;
