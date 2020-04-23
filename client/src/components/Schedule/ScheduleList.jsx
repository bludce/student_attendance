import React, {Component} from 'react';
import ScheduleForm from './ScheduleForm'
import './ScheduleList.sass'

class ScheduleList extends Component {

  state = {
    currentIndex: -1,
    result: {},
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch('http://localhost:3000/api/schedules')
      .then(res => res.json())
      .then(result => this.setSubjects(result))
      .catch(error => error);
  }

  returnList() {
    return this.state.result.data
  }

  setSubjects = result => {
    this.setState({ result });
  }

  handleEdit = (index) => {
    this.setState({
      currentIndex: index
    })
  }

  handleDelete = (index) => {
    fetch('http://localhost:3000/api/schedules/' + index ,{
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(result => this.fetchData())
      .catch(error => error);
  }

  onAddOrEdit = (data) => {
    const add = {
      Код_занятия: data.Код_занятия,
      Код_предмета: data.Код_предмета,
      Код_вида: data.Код_вида,
      Код_сотрудника: data.Код_сотрудника,
      Код_аудитории: data.Код_аудитории,
      Код_группы: data.Код_группы,
      Дата_проведения: data.Дата_проведения,
      Время_проведение: data.Время_проведение
    }
    if (this.state.currentIndex == -1)
      fetch('http://localhost:3000/api/schedules/' ,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(add)
      })
        .then(res => res.json())
        .then(result => this.fetchData())
        .catch(error => error);
    else {
      fetch('http://localhost:3000/api/schedules/' + +data.Код_занятия ,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(add)
      })
        .then(res => res.json())
        .then(result => this.fetchData())
        .catch(error => error);
    }  
  }

  render() {
    const { result } = this.state;
    const { data = [] } = result
    return(
      <div className="content">
        <h2 className="content__title">Форма для добавления/изменения</h2>
          <ScheduleForm
            currentIndex={this.state.currentIndex}
            list={data}
            onAddOrEdit={this.onAddOrEdit}
          />
          <hr />
  
          <table className="table">
            <thead>
              <tr className="table__row">
                <td className="table__column">Код_занятия</td>
                <td className="table__column">Предмет</td>
                <td className="table__column">Вид</td>
                <td className="table__column">ФИО</td>
                <td className="table__column">Аудитория</td>
                <td className="table__column">Группа</td>
                <td className="table__column">Дата_проведения</td>
                <td className="table__column">Время_проведение</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {data.map(({ Код_занятия, Предмет, Вид, ФИО, Аудитория, Группа, Дата_проведения, Время_проведение}) => 
                <tr key={Код_занятия} className="table__row">
                  <td className="table__column">{Код_занятия}</td>
                  <td className="table__column">{Предмет}</td>
                  <td className="table__column">{Вид}</td>
                  <td className="table__column">{ФИО}</td>
                  <td className="table__column">{Аудитория}</td>
                  <td className="table__column">{Группа}</td>
                  <td className="table__column">{Дата_проведения}</td>
                  <td className="table__column">{Время_проведение}</td>
                  <td className="table__column"><button onClick={() => this.handleEdit(Код_занятия)}>Изменить</button></td>
                  <td className="table__column"><button onClick={() => this.handleDelete(Код_занятия)}>Удалить</button></td>
                </tr>
              )}
            </tbody>
          </table>
      </div>
    )
  }
}

export default ScheduleList