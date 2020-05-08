import { Router } from 'express';

import QRController from '../controllers/qr.controller';

const router = Router()

router.post('/create', (req, res) => { 
  QRController.createQR(req, res) 
})

export default router