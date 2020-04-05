import { Router } from 'express';

import GroupController from '../controllers/group.controller';

const router = Router()

router.post('/', (req, res) => { 
  GroupController.createGroup(req, res) 
})
router.put('/:id', (req, res) => { 
  GroupController.updateGroup(req, res) 
})
router.delete('/:id', (req, res) => { 
  GroupController.deleteGroup(req, res) 
})
router.get('/', (req, res) => {
  GroupController.getGroups(req, res); 
})

export default router