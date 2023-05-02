import { Router } from 'express';
import userRouter from './userRouter.js';
import errorHandlingMiddleware from '../middlewares/errorHandlingMiddleware.js';

const router = Router();
router.use(userRouter);
router.use(errorHandlingMiddleware);
export default router;
