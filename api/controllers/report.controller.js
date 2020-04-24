import sql from "../models/db.js";

const getReport = (req, res) => {

  sql.query('SELECT Предмет.Название, Дата_проведения, Время_проведение, Пропуски.Код_группы, Группы.Название as Группа, ФИО, Уважительно FROM Пропуски INNER JOIN Студенты ON Студенты.Код_студента = Пропуски.Код_студента INNER JOIN Занятие ON Занятие.Код_занятия = Пропуски.Код_занятия   INNER JOIN Предмет ON Предмет.Код_предмета = Занятие.Код_предмета INNER JOIN Группы ON Пропуски.Код_группы = Группы.Код_группы ', function (error, results) {
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
  getReport
}