import React, {Component} from 'react';
import StudentForm from './StudentForm'
import './StudentList.sass'

class StudentList extends Component {

  state = {
    currentIndex: -1,
    result: {},
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch('http://localhost:3000/api/students')
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
    fetch('http://localhost:3000/api/students/' + index ,{
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(result => this.fetchData())
      .catch(error => error);
  }

  onAddOrEdit = (data) => {
    const add = {
      Код_студента: +data.Код_студента,
      ФИО: data.ФИО,
      Код_группы: +data.Код_группы,
      Логин: data.Логин,
      Пароль: data.Пароль,
      Роль: data.Роль
    }
    if (this.state.currentIndex == -1)
      fetch('http://localhost:3000/api/students/' ,{
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
      fetch('http://localhost:3000/api/students/' + +data.Код_студента ,{
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
    //   
  }

  render() {
    const { result } = this.state;
    const { data = [] } = result
    return(
      <div className="content">
        <h2 className="content__title">Форма для добавления/изменения</h2>
          <StudentForm
            currentIndex={this.state.currentIndex}
            list={data}
            onAddOrEdit={this.onAddOrEdit}
          />
          <hr />
          <table className="table">
            <thead>
              <tr className="table__row">
                <td className="table__column">Код_студента</td>
                <td className="table__column">ФИО</td>
                <td className="table__column">Код_группы</td>
                <td className="table__column">Логин</td>
                <td className="table__column">Пароль</td>
                <td className="table__column">Роль</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {data.map(({ Код_студента, ФИО,Код_группы, Логин, Пароль, Роль }) => 
                <tr key={Код_студента} className="table__row">
                  <td className="table__column">{Код_студента}</td>
                  <td className="table__column">{ФИО}</td>
                  <td className="table__column">{Код_группы}</td>
                  <td className="table__column">{Логин}</td>
                  <td className="table__column">{Пароль}</td>
                  <td className="table__column">{Роль}</td>
                  <td className="table__column"><button onClick={() => this.handleEdit(Код_студента)}>Изменить</button></td>
                  <td className="table__column"><button onClick={() => this.handleDelete(Код_студента)}>Удалить</button></td>
                </tr>
              )}
            </tbody>
          </table>
      </div>
    )
  }
}

export default StudentList