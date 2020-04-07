import { Router } from 'express';

import EmployeeController from '../controllers/employee.controller';

const router = Router()

router.post('/', (req, res) => { 
  EmployeeController.createEmployee(req, res) 
})
router.put('/:id', (req, res) => { 
  EmployeeController.updateEmployee(req, res) 
})
router.delete('/:id', (req, res) => { 
  EmployeeController.deleteEmployee(req, res) 
})
router.get('/', (req, res) => {
  EmployeeController.getEmployee(req, res); 
})

router.get('/:id', (req, res) => {
  EmployeeController.getEmployeeById(req, res); 
})

export default router