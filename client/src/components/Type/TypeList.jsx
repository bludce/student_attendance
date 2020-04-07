import React, {Component} from 'react';
import TypeForm from './TypeForm'
import './TypeList.sass'

class TypeList extends Component {

  state = {
    currentIndex: -1,
    result: {},
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch('http://localhost:3000/api/types')
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
    fetch('http://localhost:3000/api/types/' + index ,{
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(result => this.fetchData())
      .catch(error => error);
  }

  onAddOrEdit = (data) => {
    const add = {
      Код_вида_занятия: +data.Код_вида_занятия,
      Название: data.Название,
      Описание: data.Описание
    }
    if (this.state.currentIndex == -1)
      fetch('http://localhost:3000/api/types/' ,{
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
      fetch('http://localhost:3000/api/types/' + +data.Код_вида_занятия ,{
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
          <TypeForm
            currentIndex={this.state.currentIndex}
            list={data}
            onAddOrEdit={this.onAddOrEdit}
          />
          <hr />
          <table className="table">
            <thead>
              <tr className="table__row">
                <td className="table__column">Код_вида_занятия</td>
                <td className="table__column">Название</td>
                <td className="table__column">Описание</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {data.map(({ Код_вида_занятия, Название, Описание }) => 
                <tr key={Код_вида_занятия} className="table__row">
                  <td className="table__column">{Код_вида_занятия}</td>
                  <td className="table__column">{Название}</td>
                  <td className="table__column">{Описание}</td>
                  <td className="table__column"><button onClick={() => this.handleEdit(Код_вида_занятия)}>Изменить</button></td>
                  <td className="table__column"><button onClick={() => this.handleDelete(Код_вида_занятия)}>Удалить</button></td>
                </tr>
              )}
            </tbody>
          </table>
      </div>
    )
  }
}

export default TypeList