import { Router } from 'express';

import TeacherController from '../controllers/employee.controller';

const router = Router()

router.post('/', (req, res) => { 
  TeacherController.createEmployee(req, res) 
})
router.put('/:id', (req, res) => { 
  TeacherController.updateEmployee(req, res) 
})
router.delete('/:id', (req, res) => { 
  TeacherController.deleteEmployee(req, res) 
})
router.get('/', (req, res) => {
  TeacherController.getEmployees(req, res); 
})

router.get('/:id', (req, res) => {
  TeacherController.getEmployeeById(req, res); 
})

export default router