import React, {Component} from 'react';
import SubjectForm from './SubjectForm'

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
    const { data = [] } = result
    return(
      <div>
          <SubjectForm
            currentIndex={this.state.currentIndex}
            list={data}
            onAddOrEdit={this.onAddOrEdit}
          />
          <hr />
          <table>
            <thead>
              <tr>
                <td>Код_предмета</td>
                <td>Название</td>
                <td>Описание</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {data.map(({ Код_предмета, Название, Описание }) => 
                <tr key={Код_предмета}>
                  <td>{Код_предмета}</td>
                  <td>{Название}</td>
                  <td>{Описание}</td>
                  <td><button onClick={() => this.handleEdit(Код_предмета)}>Edit</button></td>
                  <td><button onClick={() => this.handleDelete(Код_предмета)}>Delete</button></td>
                </tr>
              )}
            </tbody>
          </table>
      </div>
    )
  }
}

export default SubjectList