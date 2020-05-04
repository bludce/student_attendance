import { Router } from 'express';

import StatisticController from '../controllers/statistics.controller';

const router = Router()

router.get('/valid', (req, res) => {
  StatisticController.getValidStatistics(req, res); 
})

router.get('/notvalid', (req, res) => {
  StatisticController.getNotValidStatistics(req, res); 
})

export default router