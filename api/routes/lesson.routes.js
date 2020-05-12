import { Router } from 'express';

import LessonController from '../controllers/lesson.controller';

const router = Router()

router.post('/', (req, res) => { 
  LessonController.saveLesson(req, res) 
})

router.get('/', (req, res) => {
  LessonController.getLesson(req, res); 
})
router.get('/:id', (req, res) => {
  LessonController.getStudents(req, res); 
})

export default router