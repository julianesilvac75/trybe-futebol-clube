import { Router } from 'express';
import userController from './main';

const UserRouter = Router();

UserRouter.post('/login', userController.login);
UserRouter.post('/teste', userController.teste);

export default UserRouter;
