import { Router } from 'express';

import StudentController from '../controllers/student.controller';

const router = Router()

router.post('/', (req, res) => { 
  StudentController.createEmployee(req, res) 
})
router.put('/:id', (req, res) => { 
  StudentController.updateEmployee(req, res) 
})
router.delete('/:id', (req, res) => { 
  StudentController.deleteEmployee(req, res) 
})
router.get('/', (req, res) => {
  StudentController.getEmployees(req, res); 
})

router.get('/:id', (req, res) => {
  StudentController.getEmployeeById(req, res); 
})

export default router