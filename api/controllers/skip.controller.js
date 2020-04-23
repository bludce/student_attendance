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

  sql.query('DELETE FROM Пропуски WHERE Код_занятия = ? AND Код_студента = ?', [skipId, studId], (error, response) => {
    if (error) throw error;
	  return res.status(200).json({ 
      success: true, 
    })
  }); 
  
}

const getSkips = (req, res) => {
  sql.query('SELECT Код_занятия, Пропуски.Код_студента, ФИО, Название as Группа FROM Пропуски INNER JOIN Студенты ON Студенты.Код_студента = Пропуски.Код_студента INNER JOIN Группы ON Студенты.Код_группы = Группы.Код_группы', function (error, results) {
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