import express from "express";
import { urlencoded, json } from 'body-parser';
import cors from 'cors';

import scheduleRouter from './routes/schedule.routes';
import employeeRouter from './routes/employee.routes';
import typeRouter from './routes/type.routes';
import classroomRouter from './routes/classroom.routes';
import subjectRouter from './routes/subject.routes';
import groupRouter from './routes/group.routes';
import studentRouter from './routes/student.routes';
import authRouter from './routes/auth.routes';
import skipRouter from './routes/skip.routes';
import reportRouter from './routes/report.routes';
import pdfRouter from './routes/pdf.routes';
import statisticsRouter from './routes/statistics.routes';
import profileRouter from './routes/profile.routes';

const app = express();
const apiPort = process.env.PORT || 3000;

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

app.use('/api/schedules', scheduleRouter);
app.use('/api/employees', employeeRouter);
app.use('/api/types', typeRouter);
app.use('/api/classrooms', classroomRouter);
app.use('/api/subjects', subjectRouter);
app.use('/api/groups', groupRouter);
app.use('/api/students', studentRouter);
app.use('/api/login', authRouter);
app.use('/api/skip', skipRouter);
app.use('/api/reports', reportRouter);
app.use('/api/pdf', pdfRouter);
app.use('/api/statistics', statisticsRouter);
app.use('/api/profile', profileRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));