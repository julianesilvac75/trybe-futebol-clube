import { Router } from 'express';
import authMiddleware from '../middlewares/AuthMiddleware';
import MatchController from '../controllers/MatchController';
import createMatchMiddleware from '../middlewares/CreateMatchMiddleware';
import InProgressMatchMiddleware from '../middlewares/InProgressMatchMiddleware';

const MatchRouter = Router();

MatchRouter.get('/', InProgressMatchMiddleware, MatchController.findAll);
MatchRouter.post('/', authMiddleware, createMatchMiddleware, MatchController.create);
MatchRouter.patch('/:id/finish', MatchController.update);
MatchRouter.get('/:id', MatchController.findById);
MatchRouter.patch('/:id', MatchController.update);

export default MatchRouter;
