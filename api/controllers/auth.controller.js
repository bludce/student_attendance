import sql from "../models/db.js";

const auth = (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a login and password',
    })
  }
  sql.query('SELECT Роль FROM `Пользователи` WHERE Логин = ? AND Пароль = ?', [body.Логин, body.Пароль], (error, results) => {
    if (error) throw error;
	  return res.status(200).json({ 
      insert: results, 
    })
  });          
}

export default {
  auth
}