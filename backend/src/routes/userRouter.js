import { Router } from 'express';
import { getCurrentUser } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const userRouter = Router();

userRouter.get('/me', verifyToken, getCurrentUser);

export default userRouter;