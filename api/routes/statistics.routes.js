import { Router } from 'express';

import StatisticController from '../controllers/statistics.controller';

const router = Router()

router.get('/', (req, res) => {
  StatisticController.getStatistics(req, res); 
})

router.post('/group', (req, res) => {
  StatisticController.getGroupStatistics(req, res); 
})

router.post('/subject', (req, res) => {
  StatisticController.getSubjectStatistics(req, res); 
})

router.post('/all', (req, res) => {
  StatisticController.getAllStatistics(req, res); 
})

export default router