import sql from "../models/db.js";

const getValidStatistics = (req, res) => {

  sql.query('SELECT Month(Дата_проведения) as Месяц, COUNT(Дата_проведения) as Количество FROM Пропуски INNER JOIN Студенты ON Студенты.Код_студента = Пропуски.Код_студента INNER JOIN Занятие ON Занятие.Код_занятия = Пропуски.Код_занятия INNER JOIN Предмет ON Предмет.Код_предмета = Занятие.Код_предмета INNER JOIN Группы ON Пропуски.Код_группы = Группы.Код_группы GROUP BY Month(Дата_проведения)', function (error, results) {
    if (error) {
      return res.status(500).json({ 
        success: false, 
        valid: results 
      })
    };
    return res.status(200).json({ 
      success: true, 
      valid: results 
    })
  });
}

const getNotValidStatistics = (req, res) => {

  sql.query('SELECT Month(Дата_проведения) as Месяц, COUNT(Дата_проведения) as Количество FROM Пропуски INNER JOIN Студенты ON Студенты.Код_студента = Пропуски.Код_студента INNER JOIN Занятие ON Занятие.Код_занятия = Пропуски.Код_занятия INNER JOIN Предмет ON Предмет.Код_предмета = Занятие.Код_предмета INNER JOIN Группы ON Пропуски.Код_группы = Группы.Код_группы Where Уважительно = 1 GROUP BY Month(Дата_проведения)', function (error, results) {
    if (error) {
      return res.status(500).json({ 
        success: false, 
        notValid: results 
      })
    };
    return res.status(200).json({ 
      success: true, 
      notValid: results 
    })
  });
}

export default {
  getValidStatistics,
  getNotValidStatistics
}