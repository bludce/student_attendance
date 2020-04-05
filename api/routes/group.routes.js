import { Router } from 'express';

import GroupController from '../controllers/group.controller';

const router = Router()

router.post('/create', (req, res) => { 
  GroupController.createGroup(req, res) 
})
router.put('/update/:id', (req, res) => { 
  GroupController.updateGroup(req, res) 
})
router.delete('/delete/:id', (req, res) => { 
  GroupController.deleteGroup(req, res) 
})
router.get('/list', (req, res) => {
  GroupController.getGroups(req, res); 
})

export default router