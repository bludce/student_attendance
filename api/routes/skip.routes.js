import { Router } from 'express';

import SkipController from '../controllers/skip.controller';

const router = Router()

router.delete('/:skipId/:studId', (req, res) => { 
  SkipController.deleteSkip(req, res) 
})
router.get('/', (req, res) => {
  SkipController.getSkips(req, res); 
})

router.get('/:id', (req, res) => {
  SkipController.getSkipByStudentId(req, res); 
})

export default router