import { Router } from 'express';

import TeacherController from '../controllers/teacher.controller';

const router = Router()

router.post('/create', (req, res) => { 
  TeacherController.createTeacher(req, res) 
})
router.put('/update/:id', (req, res) => { 
  TeacherController.updateTeacher(req, res) 
})
router.delete('/delete/:id', (req, res) => { 
  TeacherController.deleteTeacher(req, res) 
})
router.get('/list', (req, res) => {
  TeacherController.getTeachers(req, res); 
})

export default router