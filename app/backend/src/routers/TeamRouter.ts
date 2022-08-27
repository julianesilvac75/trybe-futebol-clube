import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const TeamRouter = Router();

TeamRouter.get('/:id', TeamController.findById);

export default TeamRouter;
