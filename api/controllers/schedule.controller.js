import sql from "../models/db.js";

const createSchedule = (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a schedule',
    })
  }

  sql.query('INSERT INTO Занятие SET ?', body, (error, response) => {
    if (error) throw error;
	  return res.status(200).json({ 
      insert: 'success', 
    })
  }); 

}

const updateSchedule = (req, res) => {
  const body = req.body
  const id = req.params.id;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    })
  }

  sql.query('UPDATE Занятие SET ? WHERE Код_занятия = ?', [body, id], (error, response) => {
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