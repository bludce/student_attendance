import { Router } from 'express';

import ClassroomController from '../controllers/classroom.controller';

const router = Router()

router.post('/', (req, res) => { 
  ClassroomController.createClassroom(req, res) 
})
router.put('/:id', (req, res) => { 
  ClassroomController.updateClassroom(req, res) 
})
router.delete('/:id', (req, res) => { 
  ClassroomController.deleteClassroom(req, res) 
})
router.get('/', (req, res) => {
  ClassroomController.getClassrooms(req, res); 
})

export default router