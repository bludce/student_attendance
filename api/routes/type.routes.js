import { Router } from 'express';

import TypeController from '../controllers/type.controller';

const router = Router()

router.post('/create', (req, res) => { 
  TypeController.createType(req, res) 
})
router.put('/update/:id', (req, res) => { 
  TypeController.updateType(req, res) 
})
router.delete('/delete/:id', (req, res) => { 
  TypeController.deleteType(req, res) 
})
router.get('/list', (req, res) => {
  TypeController.getTypes(req, res); 
})

export default router