import { Router } from 'express';
import createMatchValidate from '../middlewares/CreateMatchValidate';
import MatchController from '../controllers/MatchController';

const MatchRouter = Router();

MatchRouter.get('/', MatchController.findAll);
MatchRouter.post('/', createMatchValidate, MatchController.create);

export default MatchRouter;
