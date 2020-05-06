import { Router } from 'express';

import LessonController from '../controllers/lesson.controller';

const router = Router()

router.put('/:id', (req, res) => { 
  LessonController.updateLesson(req, res) 
})

router.get('/', (req, res) => {
  LessonController.getLesson(req, res); 
})
router.get('/:id', (req, res) => {
  LessonController.getStudents(req, res); 
})

export default router