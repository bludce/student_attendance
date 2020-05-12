import React, {Component, Fragment} from 'react';
import './Lesson.sass'
import LessonForm from './LessonForm'
import io from "socket.io-client";


class Lesson extends Component {

  state = {
    lesson: [],
    students: [],
    activeStudents: [],
  }

  socket = io('localhost:3000');

  componentDidMount() {
    this.fetchData();
    this.socket.on('ROOM:SET_USERS', (roomId) => {
      fetch(`http://localhost:3000/rooms/${roomId}`)
      .then(res => res.json())
      .then(result => console.log(result))
    });
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

  addStudent = async (lesson, student) => {

    const obj = {
        roomId: `${lesson}`,
        userName: `${student}`,
      };

      await fetch('http://192.168.1.74:3000/rooms' ,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
      })

      this.socket.emit('ROOM:JOIN', obj)
  }

  filter = ({users}) => {
    const {students} = this.state
    students.map(({ФИО}) => {
      users.includes(ФИО) ? this.setState({activeStudents:users}) : ''
    })
    console.log(users)
  }

  saveLesson = () => {
    const {students, activeStudents} = this.state
    
    const arr = students.map(({ФИО, Код_студента}) => {
      if (activeStudents.includes(ФИО)) {
        return 
      } else {
        return Код_студента
      }
      
    })
    console.log(arr)
    console.log(this.state.lesson[0].Код_занятия)
    arr.map((item) => {
      if (item !== undefined) 
        fetch('http://localhost:3000/api/lesson/' ,{
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Код_занятия: this.state.lesson[0].Код_занятия,
            Код_студента: item,
            Код_группы: this.state.lesson[0].Код_группы,
            Уважительно: false
          })
        })
          .then(res => res.json())
          .then(result => console.log('Добавлено'))
          .catch(error => error);
    })
    
  }
  
  render() {
    const {lesson, students, activeStudents} = this.state;

    return(
      
        <div className="report">
          <div className="report-form">
            <LessonForm students={students} lesson={lesson} filter={this.filter} addStudent={this.addStudent}/>
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
                        <td className="table__column">{activeStudents.includes(ФИО) ? '+' : ''}</td>
                      </tr>
                    )} 
                  </tbody>
                </table>
                <button className="form__submit" onClick={this.saveLesson}>Сохранить</button>
          </div>
        </div>
      )
  }
}

export default Lesson