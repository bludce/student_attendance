import React, { Component } from 'react'

class TypeForm extends Component {

    state = {
        ...this.returnStateObject()
    }

    returnStateObject() {
      if (this.props.currentIndex == -1)
        return {
          Код_занятия: '',
          Код_предмета: '',
          Код_вида: '',
          Код_сотрудника: '',
          Код_аудитории: '',
          Код_группы: '',
          Дата_проведения: '',
          Время_проведение: ''
        }
      else {
        for (var key in this.props.list) {
          if (this.props.currentIndex === this.props.list[key].Код_занятия ) {
            return {
              Код_занятия: this.props.list[key].Код_занятия,
              Код_предмета: this.props.list[key].Код_предмета,
              Код_вида: this.props.list[key].Код_вида,
              Код_сотрудника: this.props.list[key].Код_сотрудника,
              Код_аудитории: this.props.list[key].Код_аудитории,
              Код_группы: this.props.list[key].Код_группы,
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
          <input name="Код_предмета" placeholder="Код_предмета" onChange={this.handleInputChange} value={this.state.Код_предмета} className="form__input"/>
          <input name="Код_вида" placeholder="Код_вида" onChange={this.handleInputChange} value={this.state.Код_вида} className="form__input"/>
          <input name="Код_сотрудника" placeholder="Код_сотрудника" onChange={this.handleInputChange} value={this.state.Код_сотрудника} className="form__input"/>
          <input name="Код_аудитории" placeholder="Код_аудитории" onChange={this.handleInputChange} value={this.state.Код_аудитории} className="form__input"/>
          <input name="Код_группы" placeholder="Код_группы" onChange={this.handleInputChange} value={this.state.Код_группы} className="form__input"/>
          <input name="Дата_проведения" placeholder="Дата_проведения" onChange={this.handleInputChange} value={this.state.Дата_проведения} className="form__input"/>
          <input name="Время_проведение" placeholder="Время_проведение" onChange={this.handleInputChange} value={this.state.Время_проведение} className="form__input"/>
          <button className="form__submit" type="submit">Отправить</button>
        </form>
      )
    }
}

export default TypeForm