import React, {Component} from 'react';
import GroupForm from './GroupForm'
import './GroupList.sass'

class GroupList extends Component {

  state = {
    currentIndex: -1,
    result: {},
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch('http://localhost:3000/api/groups')
      .then(res => res.json())
      .then(result => this.setSubjects(result))
      .catch(error => error);
  }

  returnList() {
    return this.state.result.groupList
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
    fetch('http://localhost:3000/api/groups/' + index ,{
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(result => this.fetchData())
      .catch(error => error);
  }

  onAddOrEdit = (groupList) => {
    const add = {
      Код_группы: +groupList.Код_группы,
      Название: groupList.Название
    }
    if (this.state.currentIndex == -1)
      fetch('http://localhost:3000/api/groups/' ,{
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
      fetch('http://localhost:3000/api/groups/' + +groupList.Код_группы ,{
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
    const { groupList = [] } = result
    return(
      <div className="content">
        <h2 className="content__title">Форма для добавления/изменения</h2>
          <GroupForm
            currentIndex={this.state.currentIndex}
            list={groupList}
            onAddOrEdit={this.onAddOrEdit}
          />
          <div className="btn-group">
            <input type="file" name="file" id="file" class="btn-group--import" onChange={this.import}/>
            <label for="file">Импорт</label>
            <button className="btn-group--export" >Экспорт</button>
          </div>

          <hr />
          <table className="table">
            <thead>
              <tr className="table__row">
                <td className="table__column">Код_группы</td>
                <td className="table__column">Название</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {groupList.map(({ Код_группы, Название }) => 
                <tr key={Код_группы} className="table__row">
                  <td className="table__column">{Код_группы}</td>
                  <td className="table__column">{Название}</td>
                  <td className="table__column"><button onClick={() => this.handleEdit(Код_группы)}>Изменить</button></td>
                  <td className="table__column"><button onClick={() => this.handleDelete(Код_группы)}>Удалить</button></td>
                </tr>
              )}
            </tbody>
          </table>
      </div>
    )
  }
}

export default GroupList