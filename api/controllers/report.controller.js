import sql from "../models/db.js";



const getReportByDate = (req, res) => {
  const reportDate = req.params.reportDate;

  sql.query('SELECT Название, Время_проведение, ФИО, Уважительно FROM Пропуски INNER JOIN Студенты ON Студенты.Код_студента = Пропуски.Код_студента INNER JOIN Занятие ON Занятие.Код_занятия = Пропуски.Код_занятия INNER JOIN Предмет ON Предмет.Код_предмета = Занятие.Код_предмета Where Дата_проведения = ? ', reportDate, function (error, results) {
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

const getReportByGroupId = (req, res) => {
  const reportGroupId = req.params.reportGroupId;
  sql.query('SELECT Название, Время_проведение, ФИО, Уважительно FROM Пропуски INNER JOIN Студенты ON Студенты.Код_студента = Пропуски.Код_студента INNER JOIN Занятие ON Занятие.Код_занятия = Пропуски.Код_занятия INNER JOIN Предмет ON Предмет.Код_предмета = Занятие.Код_предмета Where Пропуски.Код_группы = ?', reportGroupId, function (error, results) {
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

const getReport = (req, res) => {
  const reportDate = req.params.reportDate;
  const reportGroupId = req.params.reportGroupId;

  sql.query('SELECT Название, Время_проведение, ФИО, Уважительно FROM Пропуски INNER JOIN Студенты ON Студенты.Код_студента = Пропуски.Код_студента INNER JOIN Занятие ON Занятие.Код_занятия = Пропуски.Код_занятия INNER JOIN Предмет ON Предмет.Код_предмета = Занятие.Код_предмета Where Дата_проведения = ? AND Пропуски.Код_группы = ?', [reportDate, reportGroupId], function (error, results) {
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
  getReport,
  getReportByDate,
  getReportByGroupId,
}