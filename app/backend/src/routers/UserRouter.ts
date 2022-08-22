import { Router } from 'express';
import UserController from '../controllers/UserController';
import loginValidate from '../middlewares/LoginValidate';

const UserRouter = Router();

UserRouter.post('/', loginValidate, UserController.login);

export default UserRouter;
