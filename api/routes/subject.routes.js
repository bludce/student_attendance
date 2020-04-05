import { Router } from 'express';

import SubjectController from '../controllers/subject.controller';

const router = Router()

router.post('/', (req, res) => { 
  SubjectController.createSubject(req, res) 
})
router.put('/:id', (req, res) => { 
  SubjectController.updateSubject(req, res) 
})
router.delete('/:id', (req, res) => { 
  SubjectController.deleteSubject(req, res) 
})
router.get('/', (req, res) => {
  SubjectController.getSubjects(req, res); 
})

export default router