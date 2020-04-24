import sql from "../models/db.js";

const deleteSkip = (req, res) => {
  const body = req.body
  const skipId = req.params.skipId;
  const studId = req.params.studId;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to delete',
    })
  }

  sql.query('UPDATE Пропуски SET Уважительно=1 WHERE Код_занятия = ? AND Код_студента = ?', [skipId, studId], (error, response) => {
    if (error) throw error;
	  return res.status(200).json({ 
      success: true, 
    })
  }); 
  
}

const getSkips = (req, res) => {
  sql.query('SELECT Пропуски.Код_занятия, Предмет.Название as Предмет, Дата_проведения, Время_проведение, Пропуски.Код_студента, Студенты.ФИО, Группы.Название as Группа, Уважительно FROM Пропуски   INNER JOIN Студенты ON Студенты.Код_студента = Пропуски.Код_студента INNER JOIN Группы ON Студенты.Код_группы = Группы.Код_группы INNER JOIN Занятие ON Пропуски.Код_занятия = Занятие.Код_занятия INNER JOIN Предмет ON Занятие.Код_предмета = Предмет.Код_предмета', function (error, results) {
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

const getSkipByStudentId = (req, res) => {
  const id = req.params.id;

  sql.query('SELECT Код_занятия, Фио, Название as Группа FROM Пропуски INNER JOIN Студенты ON Студенты.Код_студента = Пропуски.Код_студента INNER JOIN Группы ON Студенты.Код_группы = Группы.Код_группы WHERE Пропуски.Код_студента = ?', id, function (error, results) {
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
  getSkips,
  getSkipByStudentId,
  deleteSkip
}