import React, {Component} from 'react';
import { CSVLink } from "react-csv";
import './SkipList.sass'
import Modal from "../Modal/Modal";

class SkipList extends Component {

  state = {
    currentIndex: -1,
    result: {},
    show: false,
  }

  showModal = (Код_занятия, Код_студента) => {
    this.setState({
      show: !this.state.show,
      Код_занятия: Код_занятия,
      Код_студента: Код_студента
    });
  };

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
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({Описание: `${this.state.Описание}`})
    })
      .then(res => res.json())
      .then(result => alert("Успешно"))
      .catch(error => error);
  }

  handleInputChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }
  handleSubmit = async (e) => {
    e.preventDefault()
    this.handleDelete(this.state.Код_занятия, this.state.Код_студента)
    this.setState({
      show: !this.state.show,
    });
    this.fetchData()
  }
  render() {
    const { result } = this.state;
    const { data = [] } = result
    return(
      <div className="content">
        <Modal onClose={this.showModal} show={this.state.show}>
          <h2 className="content__title">Напишите причину уважительного пропуска</h2>
          <form onSubmit={this.handleSubmit} autoComplete="off" className="form">
            <input name="Описание" placeholder="..." onChange={this.handleInputChange} value={this.state.Уважительно} className="form__input"/>
            
            <button className="form__submit" type="submit">Отправить</button>
          </form>
        </Modal>
        <h2 className="content__title">Изменение данных о пропусках студентов</h2>
        <div className="btn-group">
            <CSVLink
              data={data}
              filename={"my-file.csv"}
              className="btn-group--export"
              target="_blank"
            >
              Экпорт
            </CSVLink>
          </div>
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
                    <td className="table__column"><button onClick={() => this.showModal(Код_занятия, Код_студента)}>Уважительно</button></td>
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