import sql from "../models/db.js";

const createSchedule = (req, res) => {
  const body = req.body

  const schedule = {
    Код_занятия: body.Код_занятия,
    Код_предмета: body.Код_предмета,
    Код_вида: body.Код_вида,
    Код_сотрудника: body.Код_сотрудника,
    Код_аудитории: body.Код_аудитории,
    Код_группы: body.Код_группы,
    Дата_проведения: body.Дата_проведения,
    Время_проведение: body.Время_проведение
  }

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a schedule',
    })
  }

  sql.query('INSERT INTO Занятие SET ?', schedule, (error, response) => {
    if (error) throw error;
	  return res.status(200).json({ 
      insert: 'success', 
    })
  }); 

}

const updateSchedule = (req, res) => {
  const body = req.body
  const id = req.params.id;

  const schedule = {
    Код_занятия: body.Код_занятия,
    Код_предмета: body.Код_предмета,
    Код_вида: body.Код_вида,
    Код_сотрудника: body.Код_сотрудника,
    Код_аудитории: body.Код_аудитории,
    Код_группы: body.Код_группы,
    Дата_проведения: body.Дата_проведения,
    Время_проведение: body.Время_проведение
  }

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    })
  }

  sql.query('UPDATE Занятие SET ? WHERE Код_занятия = ?', [schedule, id], (error, response) => {
    if (error) throw error;
	  return res.status(200).json({ 
      success: true,
    })
  }); 
  
}

const deleteSchedule = (req, res) => {
  const body = req.body 
  const id = req.params.id;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to delete',
    })
  }

  sql.query('DELETE FROM Занятие WHERE Код_занятия = ?', id, (error, response) => {
    if (error) throw error;
	  return res.status(200).json({ 
      success: true, 
    })
  }); 
  
}

const getSchedules = (req, res) => {
  sql.query('SELECT * FROM Занятие', function (error, results) {
    if (error) {
      return res.status(500).json({ 
        success: false, 
        data: results 
      })
    };
    return res.status(200).json({ 
      success: true, 
      data: results 
    })
  });
}

export default {
  getSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule
}