import { Router } from 'express';

import ClassroomController from '../controllers/classroom.controller';

const router = Router()

router.post('/create', (req, res) => { 
  ClassroomController.createClassroom(req, res) 
})
router.put('/update/:id', (req, res) => { 
  ClassroomController.updateClassroom(req, res) 
})
router.delete('/delete/:id', (req, res) => { 
  ClassroomController.deleteClassroom(req, res) 
})
router.get('/list', (req, res) => {
  ClassroomController.getClassrooms(req, res); 
})

export default router