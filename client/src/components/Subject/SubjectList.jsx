import React, {Component} from 'react';
import SubjectForm from './SubjectForm'
import './SubjectList.sass'

class SubjectList extends Component {

  state = {
    currentIndex: -1,
    result: {},
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch('http://localhost:3000/api/subjects')
      .then(res => res.json())
      .then(result => this.setSubjects(result))
      .catch(error => error);
  }

  returnList() {
    return this.state.result.subjectList
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
    fetch('http://localhost:3000/api/subjects/' + index ,{
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(result => this.fetchData())
      .catch(error => error);
  }

  onAddOrEdit = (data) => {
    const add = {
      Код_предмета: +data.Код_предмета,
      Название: data.Название,
      Описание: data.Описание
    }
    if (this.state.currentIndex == -1)
      fetch('http://localhost:3000/api/subjects/' ,{
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
      fetch('http://localhost:3000/api/subjects/' + +data.Код_предмета ,{
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
    const { subjectList = [] } = result
    return(
      <div className="content">
        <h2 className="content__title">Форма для добавления/изменения</h2>
          <SubjectForm
            currentIndex={this.state.currentIndex}
            list={subjectList}
            onAddOrEdit={this.onAddOrEdit}
          />
          <hr />
          <table className="table">
            <thead>
              <tr className="table__row">
                <td className="table__column">Код_предмета</td>
                <td className="table__column">Название</td>
                <td className="table__column">Описание</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {subjectList.map(({ Код_предмета, Название, Описание }) => 
                <tr key={Код_предмета} className="table__row">
                  <td className="table__column">{Код_предмета}</td>
                  <td className="table__column">{Название}</td>
                  <td className="table__column">{Описание}</td>
                  <td className="table__column"><button onClick={() => this.handleEdit(Код_предмета)}>Изменить</button></td>
                  <td className="table__column"><button onClick={() => this.handleDelete(Код_предмета)}>Удалить</button></td>
                </tr>
              )}
            </tbody>
          </table>
      </div>
    )
  }
}

export default SubjectList