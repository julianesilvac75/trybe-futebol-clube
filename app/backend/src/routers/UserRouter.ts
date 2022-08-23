import { Router } from 'express';
import authMiddleware from '../middlewares/AuthMiddleware';
import UserController from '../controllers/UserController';
import loginValidate from '../middlewares/LoginValidate';

const UserRouter = Router();

UserRouter.post('/', loginValidate, UserController.login);
UserRouter.get('/validate', authMiddleware, UserController.validate);

export default UserRouter;
