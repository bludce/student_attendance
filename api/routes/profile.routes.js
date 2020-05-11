import { Router } from 'express';

import ProfileController from '../controllers/profile.controller';

const router = Router()

router.get('/:id', (req, res) => {
  ProfileController.getProfile(req, res); 
})

router.get('/student/:id', (req, res) => {
  ProfileController.getStudentProfile(req, res); 
})

export default router