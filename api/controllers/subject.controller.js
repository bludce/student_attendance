import sql from "../models/db.js";

const createSubject = (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a subject',
    })
  }

  sql.query('INSERT INTO Предмет SET ?', body, (error, response) => {
    if (error) throw error;
	  return res.status(200).json({ 
      insert: 'success', 
    })
  }); 

}

const updateSubject = (req, res) => {
  const body = req.body
  const id = req.params.id;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    })
  }

  sql.query('UPDATE Предмет SET ? WHERE Код_предмета = ?', [body, id], (error, response) => {
    if (error) throw error;
	  return res.status(200).json({ 
      success: true,
    })
  }); 
  
}

const deleteSubject = (req, res) => {
  const body = req.body
  const id = req.params.id;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to delete',
    })
  }

  sql.query('DELETE FROM Предмет WHERE Код_предмета = ?', id, (error, response) => {
    if (error) throw error;
	  return res.status(200).json({ 
      success: true, 
    })
  }); 
  
}

const getSubjects = (req, res) => {
  sql.query('SELECT * FROM Предмет', function (error, results) {
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
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject
}