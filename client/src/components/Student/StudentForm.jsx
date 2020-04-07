import React, { Component } from 'react'

class StudentForm extends Component {

    state = {
        ...this.returnStateObject()
    }

    returnStateObject() {
      if (this.props.currentIndex == -1)
        return {
          Код_студента: '',
          ФИО: '',
          Код_группы: '',
          Логин: '',
          Пароль: '',
          Роль: ''
        }
      else {
        for (var key in this.props.list) {
          if (this.props.currentIndex === this.props.list[key].Код_студента ) {
            return {
              Код_студента: this.props.list[key].Код_студента,
              ФИО: this.props.list[key].ФИО ,
              Код_группы: this.props.list[key].Код_группы ,
              Логин: this.props.list[key].Логин,
              Пароль: this.props.list[key].Пароль,
              Роль: this.props.list[key].Роль,
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
          <input name="Код_студента" placeholder="Код_студента" onChange={this.handleInputChange} value={this.state.Код_студента} className="form__input"/>
          <input name="ФИО" placeholder="ФИО" onChange={this.handleInputChange} value={this.state.ФИО} className="form__input"/>
          <input name="Код_группы" placeholder="Код_группы" onChange={this.handleInputChange} value={this.state.Код_группы} className="form__input"/>
          <input name="Логин" placeholder="Логин" onChange={this.handleInputChange} value={this.state.Логин} className="form__input"/>
          <input name="Пароль" placeholder="Пароль" onChange={this.handleInputChange} value={this.state.Пароль} className="form__input"/>
          
          <input name="Роль" placeholder="Роль" onChange={this.handleInputChange} value={this.state.Роль} className="form__input"/>
          <button className="form__submit" type="submit">Отправить</button>
        </form>
      )
    }
}

export default StudentForm