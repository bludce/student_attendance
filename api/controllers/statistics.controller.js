import sql from "../models/db.js";

const getStatistics = (req, res) => {
  let data = {
    valid: {},
    notValid: {},
  };

  sql.query('SELECT Month(Дата_проведения) as Месяц, COUNT(Дата_проведения) as Количество FROM Пропуски INNER JOIN Студенты ON Студенты.Код_студента = Пропуски.Код_студента INNER JOIN Занятие ON Занятие.Код_занятия = Пропуски.Код_занятия INNER JOIN Предмет ON Предмет.Код_предмета = Занятие.Код_предмета INNER JOIN Группы ON Пропуски.Код_группы = Группы.Код_группы GROUP BY Month(Дата_проведения); SELECT Month(Дата_проведения) as Месяц, COUNT(Дата_проведения) as Количество FROM Пропуски INNER JOIN Студенты ON Студенты.Код_студента = Пропуски.Код_студента INNER JOIN Занятие ON Занятие.Код_занятия = Пропуски.Код_занятия INNER JOIN Предмет ON Предмет.Код_предмета = Занятие.Код_предмета INNER JOIN Группы ON Пропуски.Код_группы = Группы.Код_группы Where Уважительно = 1 GROUP BY Month(Дата_проведения)', function (error, results) {
    data.valid = results[0];
    data.notValid = results[1];
    return res.status(200).json({ 
      success: true, 
      result: data 
    })
  });
  
}

const getGroupStatistics = (req, res) => {
  const group = req.body.Группа
  let data = {
    valid: {},
    notValid: {},
  };
  

  sql.query('SELECT Month(Дата_проведения) as Месяц, COUNT(Дата_проведения) as Количество FROM Пропуски INNER JOIN Студенты ON Студенты.Код_студента = Пропуски.Код_студента INNER JOIN Занятие ON Занятие.Код_занятия = Пропуски.Код_занятия INNER JOIN Предмет ON Предмет.Код_предмета = Занятие.Код_предмета INNER JOIN Группы ON Пропуски.Код_группы = Группы.Код_группы WHERE Группы.Название = ? GROUP BY Month(Дата_проведения); SELECT Month(Дата_проведения) as Месяц, COUNT(Дата_проведения) as Количество FROM Пропуски INNER JOIN Студенты ON Студенты.Код_студента = Пропуски.Код_студента INNER JOIN Занятие ON Занятие.Код_занятия = Пропуски.Код_занятия INNER JOIN Предмет ON Предмет.Код_предмета = Занятие.Код_предмета INNER JOIN Группы ON Пропуски.Код_группы = Группы.Код_группы Where Уважительно = 1 && Группы.Название = ?GROUP BY Month(Дата_проведения)', [group, group], function (error, results) {
    data.valid = results[0];
    data.notValid = results[1];
    return res.status(200).json({ 
      success: true, 
      result: data 
    })
  });
}

const getSubjectStatistics = (req, res) => {
  const subject = req.body.Предмет
  let data = {
    valid: {},
    notValid: {},
  };

  sql.query('SELECT Month(Дата_проведения) as Месяц, COUNT(Дата_проведения) as Количество FROM Пропуски INNER JOIN Студенты ON Студенты.Код_студента = Пропуски.Код_студента INNER JOIN Занятие ON Занятие.Код_занятия = Пропуски.Код_занятия INNER JOIN Предмет ON Предмет.Код_предмета = Занятие.Код_предмета INNER JOIN Группы ON Пропуски.Код_группы = Группы.Код_группы WHERE Предмет.Название = ? GROUP BY Month(Дата_проведения); SELECT Month(Дата_проведения) as Месяц, COUNT(Дата_проведения) as Количество FROM Пропуски INNER JOIN Студенты ON Студенты.Код_студента = Пропуски.Код_студента INNER JOIN Занятие ON Занятие.Код_занятия = Пропуски.Код_занятия INNER JOIN Предмет ON Предмет.Код_предмета = Занятие.Код_предмета INNER JOIN Группы ON Пропуски.Код_группы = Группы.Код_группы Where Уважительно = 1 && Предмет.Название = ?GROUP BY Month(Дата_проведения)', [subject, subject], function (error, results) {
    data.valid = results[0];
    data.notValid = results[1];
    return res.status(200).json({ 
      success: true, 
      result: data 
    })
  });
}

const getAllStatistics = (req, res) => {
  const group = req.body.Группа
  const subject = req.body.Предмет
  let data = {
    valid: {},
    notValid: {},
  };

  sql.query('SELECT Month(Дата_проведения) as Месяц, COUNT(Дата_проведения) as Количество FROM Пропуски INNER JOIN Студенты ON Студенты.Код_студента = Пропуски.Код_студента INNER JOIN Занятие ON Занятие.Код_занятия = Пропуски.Код_занятия INNER JOIN Предмет ON Предмет.Код_предмета = Занятие.Код_предмета INNER JOIN Группы ON Пропуски.Код_группы = Группы.Код_группы WHERE Предмет.Название = ? && Группы.Название = ? GROUP BY Month(Дата_проведения); SELECT Month(Дата_проведения) as Месяц, COUNT(Дата_проведения) as Количество FROM Пропуски INNER JOIN Студенты ON Студенты.Код_студента = Пропуски.Код_студента INNER JOIN Занятие ON Занятие.Код_занятия = Пропуски.Код_занятия INNER JOIN Предмет ON Предмет.Код_предмета = Занятие.Код_предмета INNER JOIN Группы ON Пропуски.Код_группы = Группы.Код_группы Where Уважительно = 1 && Предмет.Название = ? && Группы.Название = ? GROUP BY Month(Дата_проведения)', [subject, group, subject, group], function (error, results) {
    data.valid = results[0];
    data.notValid = results[1];
    return res.status(200).json({ 
      success: true, 
      result: data 
    })
  });
}

export default {
  getStatistics,
  getSubjectStatistics,
  getGroupStatistics,
  getAllStatistics
}