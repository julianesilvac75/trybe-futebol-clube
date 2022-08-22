import { Router } from 'express';
import UserController from '../controllers/UserController';

const UserRouter = Router();

UserRouter.post('/', UserController.login);

export default UserRouter;
