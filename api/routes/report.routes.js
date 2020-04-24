import { Router } from 'express';

import ReportController from '../controllers/report.controller';

const router = Router()

router.get('/', (req, res) => {
  ReportController.getReport(req, res); 
})

export default router