import React, {Component} from 'react';
import ClassroomForm from './ClassroomForm'
import './ClassroomList.sass'

class ClassroomList extends Component {

  state = {
    currentIndex: -1,
    result: {},
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch('http://localhost:3000/api/classrooms')
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
    fetch('http://localhost:3000/api/classrooms/' + index ,{
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(result => this.fetchData())
      .catch(error => error);
  }

  onAddOrEdit = (data) => {
    const add = {
      Код_аудитории: +data.Код_аудитории,
      Название: data.Название
    }
    if (this.state.currentIndex == -1)
      fetch('http://localhost:3000/api/classrooms/' ,{
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
      fetch('http://localhost:3000/api/classrooms/' + +data.Код_аудитории ,{
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
          <ClassroomForm
            currentIndex={this.state.currentIndex}
            list={data}
            onAddOrEdit={this.onAddOrEdit}
          />
          <hr />
          <table className="table">
            <thead>
              <tr className="table__row">
                <td className="table__column">Код_аудитории</td>
                <td className="table__column">Название</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {data.map(({ Код_аудитории, Название }) => 
                <tr key={Код_аудитории} className="table__row">
                  <td className="table__column">{Код_аудитории}</td>
                  <td className="table__column">{Название}</td>
                  <td className="table__column"><button onClick={() => this.handleEdit(Код_аудитории)}>Изменить</button></td>
                  <td className="table__column"><button onClick={() => this.handleDelete(Код_аудитории)}>Удалить</button></td>
                </tr>
              )}
            </tbody>
          </table>
      </div>
    )
  }
}

export default ClassroomList