import React, { Component } from 'react'

class TypeForm extends Component {

    state = {
        ...this.returnStateObject()
    }

    returnStateObject() {
      if (this.props.currentIndex == -1)
        return {
          Код_занятия: '',
          Предмет: '',
          Вид: '',
          ФИО: '',
          Аудитория: '',
          Группа: '',
          Дата_проведения: '',
          Время_проведение: ''
        }
      else {
        for (var key in this.props.list) {
          if (this.props.currentIndex === this.props.list[key].Код_занятия ) {
            return {
              Код_занятия: this.props.list[key].Код_занятия,
              Предмет: this.props.list[key].Предмет,
              Вид: this.props.list[key].Вид,
              ФИО: this.props.list[key].ФИО,
              Аудитория: this.props.list[key].Аудитория,
              Группа: this.props.list[key].Группа,
              Дата_проведения: this.props.list[key].Дата_проведения,
              Время_проведение: this.props.list[key].Время_проведение
            }
          }
        }
      }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentIndex != this.props.currentIndex || prevProps.list != this.props.list) {
            this.setState({ ...this.returnStateObject() })
            // console.log(prevProps, this.props)
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.onAddOrEdit(this.state)
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit} autoComplete="off" className="form">
          <input name="Код_занятия" placeholder="Код_занятия" onChange={this.handleInputChange} value={this.state.Код_занятия} className="form__input"/>
          <input name="Код_предмета" placeholder="Предмет" onChange={this.handleInputChange} value={this.state.Предмет} className="form__input"/>
          <input name="Код_вида" placeholder="Вид" onChange={this.handleInputChange} value={this.state.Вид} className="form__input"/>
          <input name="Код_сотрудника" placeholder="ФИО" onChange={this.handleInputChange} value={this.state.ФИО} className="form__input"/>
          <input name="Код_аудитории" placeholder="Аудитория" onChange={this.handleInputChange} value={this.state.Аудитория} className="form__input"/>
          <input name="Код_группы" placeholder="Группа" onChange={this.handleInputChange} value={this.state.Группа} className="form__input"/>
          <input name="Дата_проведения" placeholder="Дата_проведения" onChange={this.handleInputChange} value={this.state.Дата_проведения} className="form__input"/>
          <input name="Время_проведение" placeholder="Время_проведение" onChange={this.handleInputChange} value={this.state.Время_проведение} className="form__input"/>
          <button className="form__submit" type="submit">Отправить</button>
        </form>
      )
    }
}

export default TypeForm