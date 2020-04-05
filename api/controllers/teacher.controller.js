import sql from "../models/db.js";

const createTeacher = (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a teacher',
    })
  }

  sql.query('INSERT INTO Сотрудники SET ?', body, (error, response) => {
    if (error) throw error;
	  return res.status(200).json({ 
      insert: 'success', 
    })
  }); 

}

const updateTeacher = (req, res) => {
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

const deleteTeacher = (req, res) => {
  const body = req.body
  const id = req.params.id;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to delete',
    })
  }

  sql.query('DELETE FROM Сотрудники WHERE Код_сотрудника = ?', id, (error, response) => {
    if (error) throw error;
	  return res.status(200).json({ 
      success: true, 
    })
  }); 
  
}

const getTeachers = (req, res) => {
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

export default {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher
}