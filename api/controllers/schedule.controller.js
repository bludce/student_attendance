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
  sql.query('SELECT Код_занятия, Предмет.Название as Предмет, Вид_занятия.Название as Вид, Сотрудники.ФИО, Аудитории.Название as Аудитория, Группы.Название as Группа, Дата_проведения, Время_проведение FROM Занятие INNER JOIN Предмет ON Занятие.Код_предмета = Предмет.Код_предмета INNER JOIN Вид_занятия ON Занятие.Код_вида = Вид_занятия.Код_вида_занятия INNER JOIN Сотрудники ON Занятие.Код_сотрудника = Сотрудники.Код_сотрудника  INNER JOIN Аудитории ON Занятие.Код_аудитории = Аудитории.Код_аудитории  INNER JOIN Группы ON Занятие.Код_группы = Группы.Код_группы', function (error, results) {
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