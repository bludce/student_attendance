import sql from "../models/db.js";

const getProfile = (req, res) => {
  const id = req.params.id;

  sql.query('SELECT Код_пользователя, ФИО, Должность, Роль FROM Сотрудники INNER JOIN Пользователи ON Сотрудники.Код_сотрудника = Пользователи.Код_пользователя WHERE Код_пользователя = ?', id, function (error, results) {
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

const getStudentProfile = (req, res) => {
  const id = req.params.id;

  sql.query('SELECT ФИО, Группы.Название as Группа FROM Студенты INNER JOIN Группы ON Студенты.Код_группы = Группы.Код_группы WHERE Код_студента = 1002', id, function (error, results) {
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
  getProfile,
  getStudentProfile
}