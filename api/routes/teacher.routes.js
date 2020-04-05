import { Router } from 'express';

import TeacherController from '../controllers/teacher.controller';

const router = Router()

router.post('/', (req, res) => { 
  TeacherController.createTeacher(req, res) 
})
router.put('/:id', (req, res) => { 
  TeacherController.updateTeacher(req, res) 
})
router.delete('/:id', (req, res) => { 
  TeacherController.deleteTeacher(req, res) 
})
router.get('/', (req, res) => {
  TeacherController.getTeachers(req, res); 
})

export default router