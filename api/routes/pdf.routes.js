import { Router } from 'express';

import PdfController from '../controllers/pdf.controller';

const router = Router()

router.post('/create', (req, res) => { 
  PdfController.createPdf(req, res) 
})

router.get('/fetch', (req, res) => {
  PdfController.getPdf(req, res); 
})

export default router