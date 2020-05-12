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
import lessonRouter from './routes/lesson.routes';
import qrRouter from './routes/qr.routes';

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
app.use('/api/lesson', lessonRouter);
app.use('/api/qr', qrRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})


const socket = require('socket.io');
const io = socket(app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`)));


const rooms = new Map();

app.get('/rooms/:id', (req, res) => {
  const { id: roomId } = req.params;
  const obj = rooms.has(roomId)
    ? {
        users: [...rooms.get(roomId).get('users').values()],
      }
    : { users: []};
  return res.status(200).json(obj)
});

app.post('/rooms', (req, res) => {
  const { roomId, userName } = req.body;
  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ['users', new Set()],
      ]),
    );
  } 
  res.send();
});

io.on('connection', (socket) => {
  socket.on('ROOM:JOIN', ({roomId, userName}) => {
    socket.join(roomId);
    rooms.get(roomId).get('users').add(userName);
    socket.to(roomId).broadcast.emit('ROOM:SET_USERS', roomId);
    console.log(rooms)
  });

  socket.on('disconnect', () => {
    rooms.forEach((value, roomId) => {
      if (value.get('users').delete(socket.id)) {
        const users = [...value.get('users').values()];
        socket.to(roomId).broadcast.emit('ROOM:SET_USERS', users);
      }
    });
  });
  console.log('user connected', socket.id);
});
