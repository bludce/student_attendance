import { Router } from 'express';

import TypeController from '../controllers/type.controller';

const router = Router()

router.post('/', (req, res) => { 
  TypeController.createType(req, res) 
})
router.put('/:id', (req, res) => { 
  TypeController.updateType(req, res) 
})
router.delete('/:id', (req, res) => { 
  TypeController.deleteType(req, res) 
})
router.get('/', (req, res) => {
  TypeController.getTypes(req, res); 
})

export default router