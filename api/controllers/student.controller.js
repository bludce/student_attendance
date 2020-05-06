import sql from "../models/db.js";

const createStudent = (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a teacher',
    })
  }

  const user = {
    "Код_пользователя": body.Код_студента,
    "Логин": body.Логин,
    "Пароль": body.Пароль,
    "Роль": body.Роль,
  }

  const student = {
    "Код_студента": body.Код_студента,
    "ФИО": body.ФИО,
    "Код_группы": body.Код_группы
  }
  sql.query('INSERT INTO Пользователи SET ?', user, (error, response) => {
    if (error) throw error;

    sql.query('INSERT INTO Студенты SET ?', student, (error, response) => {
      if (error) throw error;
      return res.status(200).json({ 
        insert: 'success', 
      })
    }); 
  }); 
  

}

const updateStudent = (req, res) => {
  const body = req.body
  const id = req.params.id;

  const user = {
    "Код_пользователя": body.Код_студента,
    "Логин": body.Логин,
    "Пароль": body.Пароль,
    "Роль": body.Роль,
  }

  const student = {
    "Код_студента": body.Код_студента,
    "ФИО": body.ФИО,
    "Код_группы": body.Код_группы
  }

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    })
  }

  sql.query('UPDATE Пользователи SET ? WHERE Код_пользователя = ?', [user, id], (error, response) => {
    if (error) throw error;
	  sql.query('UPDATE Студенты SET ? WHERE Код_студента = ?', [student, id], (error, response) => {
      if (error) throw error;
      return res.status(200).json({ 
        success: true,
      })
    });
  }); 
  
}

const deleteStudent = (req, res) => {
  const body = req.body
  const id = req.params.id;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to delete',
    })
  }

  sql.query('DELETE FROM Пользователи WHERE Код_пользователя = ?', id, (error, response) => {
    if (error) throw error;
	  sql.query('DELETE FROM Студенты WHERE Код_студента = ?', id, (error, response) => {
      if (error) throw error;
      return res.status(200).json({ 
        success: true, 
      })
    }); 
  }); 
  
}

const getStudents = (req, res) => {
  sql.query('SELECT Код_студента, ФИО, Студенты.Код_группы, Роль FROM Студенты INNER JOIN Пользователи ON Студенты.Код_студента = Пользователи.Код_пользователя INNER JOIN Группы ON Студенты.Код_группы = Группы.Код_группы', function (error, results) {
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

const getStudentById = (req, res) => {
  const id = req.params.id;

  sql.query('SELECT Код_студента, ФИО, Название, Логин, Пароль, Роль FROM Студенты   INNER JOIN Пользователи ON Студенты.Код_студента = Пользователи.Код_пользователя INNER JOIN Группы ON Студенты.Код_группы = Группы.Код_группы WHERE Код_студента = ?', id, function (error, results) {
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
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentById
}