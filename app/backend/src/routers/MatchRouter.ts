import { Router } from 'express';
import createMatchValidate from '../middlewares/CreateMatchValidate';
import MatchController from '../controllers/MatchController';

const MatchRouter = Router();

MatchRouter.get('/', MatchController.findAll);
MatchRouter.post('/', createMatchValidate, MatchController.create);
MatchRouter.get('/:id', MatchController.findById);

export default MatchRouter;
