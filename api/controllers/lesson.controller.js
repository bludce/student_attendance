import sql from "../models/db.js";

const updateLesson = (req, res) => {
  const body = req.body
  const id = req.params.id;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    })
  }

  sql.query('UPDATE Вид_занятия SET ? WHERE Код_вида_занятия = ?', [body, id], (error, response) => {
    if (error) throw error;
	  return res.status(200).json({ 
      success: true,
    })
  }); 
  
}

const getLesson = (req, res) => {
  sql.query('SELECT Занятие.Код_группы, Предмет.Название as Предмет, Вид_занятия.Название as Вид, Аудитории.Название as Аудитория, Группы.Название as Группа, Дата_проведения, Время_проведение FROM Занятие INNER JOIN Предмет ON Занятие.Код_предмета = Предмет.Код_предмета INNER JOIN Вид_занятия ON Занятие.Код_вида = Вид_занятия.Код_вида_занятия INNER JOIN Сотрудники ON Занятие.Код_сотрудника = Сотрудники.Код_сотрудника INNER JOIN Аудитории ON Занятие.Код_аудитории = Аудитории.Код_аудитории INNER JOIN Группы ON Занятие.Код_группы = Группы.Код_группы WHERE Код_занятия = 25;', function (error, results) {
    if (error) {
      return res.status(500).json({ 
        success: false, 
        lesson: results 
      })
    };
    return res.status(200).json(results)
  });
}

const getStudents = (req, res) => {
  const id = req.params.id
  sql.query('SELECT ФИО, Код_студента FROM Студенты INNER JOIN Группы ON Студенты.Код_группы = Группы.Код_группы WHERE Группы.Код_группы = ?', id, function (error, results) {
    if (error) {
      return res.status(500).json({ 
        success: false, 
        data: results 
      })
    };
    return res.status(200).json(results)
  });
}

export default {
  getLesson,
  getStudents,
  updateLesson
}