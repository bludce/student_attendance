import { Router } from 'express';

import SubjectController from '../controllers/subject.controller';

const router = Router()

router.post('/create', (req, res) => { 
  SubjectController.createSubject(req, res) 
})
router.put('/update/:id', (req, res) => { 
  SubjectController.updateSubject(req, res) 
})
router.delete('/delete/:id', (req, res) => { 
  SubjectController.deleteSubject(req, res) 
})
router.get('/list', (req, res) => {
  SubjectController.getSubjects(req, res); 
})

export default router