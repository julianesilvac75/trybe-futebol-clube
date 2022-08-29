import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import createMatchMiddleware from '../middlewares/CreateMatchMiddleware';

const MatchRouter = Router();

MatchRouter.get('/', MatchController.findAll);
MatchRouter.post('/', createMatchMiddleware, MatchController.create);
MatchRouter.patch('/:id/finish', MatchController.updateStatus);
MatchRouter.get('/:id', MatchController.findById);

export default MatchRouter;
