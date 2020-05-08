import React, {Component, Fragment} from 'react';
import './Lesson.sass'
import LessonForm from './LessonForm'



class Lesson extends Component {

  state = {
    lesson: [],
    students: [],
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch(`http://localhost:3000/api/lesson/`)
      .then(res => res.json())
      .then(result => {
        this.setState({ lesson: result})
        fetch(`http://localhost:3000/api/lesson/${this.state.lesson[0].Код_группы}`)
          .then(res => res.json())
          .then(result => {
            this.setState({ students: result })
          })
      })
      .catch(error => error);
  }

  filter = () => {
    
  }
  
  render() {
    const {lesson, students} = this.state;

    return(
      
        <div className="report">
          <div className="report-form">
            <LessonForm students={students} lesson={lesson}/>
          </div>
          <div className="report-content">
            <h2 className="content__title">Текущее занятие</h2>
              {lesson.map(({Предмет, Вид, Аудитория, Группа, Дата_проведения, Время_проведение}) => 
                <Fragment>
                  <div>Предмет: {Предмет} {Вид}</div>
                  <div>Аудитория: {Аудитория}</div>
                  <div>Группа: {Группа}</div>
                  <div>Дата проведения: {Дата_проведения.slice(0,10)} {Время_проведение}</div>
                </Fragment>
              )}    
            <hr />
              <table className="table">
                  <thead>
                    <tr className="table__row">
                      <td className="table__column">ФИО</td>
                      <td className="table__column">Присутствие</td>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(({ФИО, Код_студента}) => 
                      <tr key={Код_студента} className="table__row">
                        <td className="table__column">{ФИО}</td>
                        <td className="table__column"></td>
                      </tr>
                    )} 
                  </tbody>
                </table>
          </div>
        </div>
      )
  }
}

export default Lesson