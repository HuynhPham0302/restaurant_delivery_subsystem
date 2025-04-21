import { Router } from 'express';
import AuthRouter from './Auth.routers';

const router = Router();

router.use('/auth', AuthRouter);

export default router;
