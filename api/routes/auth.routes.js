import { Router } from 'express';

import AuthController from '../controllers/auth.controller';

const router = Router()

router.post('/', (req, res) => { 
  AuthController.auth(req, res) 
})

export default router