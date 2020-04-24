import { Router } from 'express';

import ReportController from '../controllers/report.controller';

const router = Router()

router.get('/all/:reportDate/:reportGroupId', (req, res) => {
  ReportController.getReport(req, res); 
})

router.get('/date/:reportDate', (req, res) => {
  ReportController.getReportByDate(req, res); 
})

router.get('/group/:reportGroupId', (req, res) => {
  ReportController.getReportByGroupId(req, res); 
})

export default router