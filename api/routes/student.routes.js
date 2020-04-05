import { Router } from 'express';

import StudentController from '../controllers/student.controller';

const router = Router()

router.post('/', (req, res) => { 
  StudentController.createStudent(req, res) 
})
router.put('/:id', (req, res) => { 
  StudentController.updateStudent(req, res) 
})
router.delete('/:id', (req, res) => { 
  StudentController.deleteStudent(req, res) 
})
router.get('/', (req, res) => {
  StudentController.getStudents(req, res); 
})

router.get('/:id', (req, res) => {
  StudentController.getStudentById(req, res); 
})

export default router