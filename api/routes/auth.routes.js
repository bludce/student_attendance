import { Router } from 'express';

import TAuthController from '../controllers/auth.controller';

const router = Router()

router.post('/', (req, res) => { 
  TAuthController.auth(req, res) 
})

export default router