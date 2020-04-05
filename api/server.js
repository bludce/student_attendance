import express from "express";
import { urlencoded, json } from 'body-parser';

import scheduleRouter from './routes/schedule.routes';
import teacherRouter from './routes/teacher.routes';
import typeRouter from './routes/type.routes';
import classroomRouter from './routes/classroom.routes';

const app = express();
const apiPort = process.env.PORT || 3041;

app.use(urlencoded({ extended: true }));
app.use(json());

app.use('/api/schedule', scheduleRouter);
app.use('/api/teacher', teacherRouter);
app.use('/api/type', typeRouter);
app.use('/api/classroom', classroomRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));