import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const LeaderboardRouter = Router();

LeaderboardRouter.get('/home', LeaderboardController.home);

export default LeaderboardRouter;
