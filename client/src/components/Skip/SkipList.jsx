import React, {Component} from 'react';
import './SkipList.sass'

class SkipList extends Component {

  state = {
    currentIndex: -1,
    result: {},
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch('http://localhost:3000/api/skip')
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

  handleDelete = (skipId, studId) => {
    fetch(`http://localhost:3000/api/skip/${skipId}/${studId}` ,{
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(result => this.fetchData())
      .catch(error => error);
  }

  render() {
    const { result } = this.state;
    const { data = [] } = result
    return(
      <div className="content">
        <h2 className="content__title">Изменение данных о пропусках студентов</h2>
          <table className="table">
            <thead>
              <tr className="table__row">
                <td className="table__column">Код_занятия</td>
                <td className="table__column">Предмет</td>
                <td className="table__column">Дата проведения</td>
                <td className="table__column">Время проведения</td>
                <td className="table__column">ФИО</td>
                <td className="table__column">Группа</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {data.map(({ Код_занятия, Предмет, Дата_проведения, Время_проведение, Код_студента, ФИО, Группа, Уважительно }) => 
                {if (Уважительно === 0) {
                  return (<tr className="table__row">
                    <td className="table__column">{Код_занятия}</td>
                    <td className="table__column">{Предмет}</td>
                    <td className="table__column">{Дата_проведения.slice(0,10)}</td>
                    <td className="table__column">{Время_проведение}</td>
                    <td className="table__column">{ФИО}</td>
                    <td className="table__column">{Группа}</td>
                    <td className="table__column"><button onClick={() => this.handleDelete(Код_занятия, Код_студента)}>Уважительно</button></td>
                  </tr>)
                } 
                }
              )}
            </tbody>
          </table>
      </div>
    )
  }
}

export default SkipList