import sql from "../models/db.js";

const createEmployee = (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a teacher',
    })
  }

  const user = {
    "Код_пользователя": body.Код_пользователя,
    "Логин": body.Логин,
    "Пароль": body.Пароль,
    "Роль": body.Роль,
  }

  const employee = {
    "Код_сотрудника": body.Код_пользователя,
    "ФИО": body.ФИО,
    "Должность": body.Должность
  }
  sql.query('INSERT INTO Пользователи SET ?', user, (error, response) => {
    if (error) throw error;

    sql.query('INSERT INTO Сотрудники SET ?', employee, (error, response) => {
      if (error) throw error;
      return res.status(200).json({ 
        insert: 'success', 
      })
    }); 
  }); 
  

}

const updateEmployee = (req, res) => {
  const body = req.body
  const id = req.params.id;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    })
  }

  sql.query('UPDATE Сотрудники SET ? WHERE Код_сотрудника = ?', [body, id], (error, response) => {
    if (error) throw error;
	  return res.status(200).json({ 
      success: true,
    })
  }); 
  
}

const deleteEmployee = (req, res) => {
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
	  sql.query('DELETE FROM Сотрудники WHERE Код_сотрудника = ?', id, (error, response) => {
      if (error) throw error;
      return res.status(200).json({ 
        success: true, 
      })
    }); 
  }); 
  
}

const getEmployees = (req, res) => {
  sql.query('SELECT * FROM Сотрудники', function (error, results) {
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

const getEmployeeById = (req, res) => {
  const id = req.params.id;

  sql.query('SELECT * FROM Сотрудники WHERE Код_сотрудника = ?', id, function (error, results) {
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
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById
}