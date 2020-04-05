import { Router } from 'express';

import ScheduleController from '../controllers/schedule.controller';

const router = Router()

router.post('/create', (req, res) => { 
  ScheduleController.createSchedule(req, res) 
})
router.put('/update/:id', (req, res) => { 
  ScheduleController.updateSchedule(req, res) 
})
router.delete('/delete/:id', (req, res) => { 
  ScheduleController.deleteSchedule(req, res) 
})
router.get('/schedules', (req, res) => {
  ScheduleController.getSchedules(req, res); 
})

export default router