import { Router } from 'express';

import ProfileController from '../controllers/profile.controller';

const router = Router()

router.get('/:id', (req, res) => {
  ProfileController.getProfile(req, res); 
})

export default router