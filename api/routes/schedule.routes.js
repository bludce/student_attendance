import { Router } from 'express';

import ScheduleController from '../controllers/schedule.controller';

const router = Router()

router.post('/', (req, res) => { 
  ScheduleController.createSchedule(req, res) 
})
router.put('/:id', (req, res) => { 
  ScheduleController.updateSchedule(req, res) 
})
router.delete('/:id', (req, res) => { 
  ScheduleController.deleteSchedule(req, res) 
})
router.get('/', (req, res) => {
  ScheduleController.getSchedules(req, res); 
})

export default router