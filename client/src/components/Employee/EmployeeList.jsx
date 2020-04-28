import React, {Component} from 'react';
import { CSVLink } from "react-csv";
import EmployeeForm from './EmployeeForm'
import './EmployeeList.sass'

class EmployeeList extends Component {

  state = {
    currentIndex: -1,
    result: {},
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch('http://localhost:3000/api/employees')
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
    fetch('http://localhost:3000/api/employees/' + index ,{
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(result => this.fetchData())
      .catch(error => error);
  }

  onAddOrEdit = (data) => {
    const add = {
      Код_пользователя: +data.Код_пользователя,
      ФИО: data.ФИО,
      Логин: data.Логин,
      Пароль: data.Пароль,
      Должность: data.Должность,
      Роль: data.Роль
    }
    if (this.state.currentIndex == -1)
      fetch('http://localhost:3000/api/employees/' ,{
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
      fetch('http://localhost:3000/api/employees/' + +data.Код_пользователя ,{
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
  import = (e) => {
    alert(`Данные загруженны из файла ${e.target.files[0].name}`)
  }

  render() {
    const { result } = this.state;
    const { data = [] } = result
    return(
      <div className="content">
        <h2 className="content__title">Форма для добавления/изменения</h2>
          <EmployeeForm
            currentIndex={this.state.currentIndex}
            list={data}
            onAddOrEdit={this.onAddOrEdit}
          />
          <div className="btn-group">
            <input type="file" name="file" id="file" className="btn-group--import" onChange={this.import}/>
            <label for="file">Импорт</label>
            <CSVLink
              data={data}
              filename={"my-file.csv"}
              className="btn-group--export"
              target="_blank"
            >
              Экпорт
            </CSVLink>
          </div>
          <hr />
          <table className="table">
            <thead>
              <tr className="table__row">
                <td className="table__column">Код_пользователя</td>
                <td className="table__column">ФИО</td>
                <td className="table__column">Логин</td>
                <td className="table__column">Пароль</td>
                <td className="table__column">Должность</td>
                <td className="table__column">Роль</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {data.map(({ Код_пользователя, ФИО, Логин, Пароль, Должность, Роль }) => 
                <tr key={Код_пользователя} className="table__row">
                  <td className="table__column">{Код_пользователя}</td>
                  <td className="table__column">{ФИО}</td>
                  <td className="table__column">{Логин}</td>
                  <td className="table__column">{Пароль}</td>
                  <td className="table__column">{Должность}</td>
                  <td className="table__column">{Роль}</td>
                  <td className="table__column"><button onClick={() => this.handleEdit(Код_пользователя)}>Изменить</button></td>
                  <td className="table__column"><button onClick={() => this.handleDelete(Код_пользователя)}>Удалить</button></td>
                </tr>
              )}
            </tbody>
          </table>
      </div>
    )
  }
}

export default EmployeeList