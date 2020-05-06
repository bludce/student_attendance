import React, { Component } from 'react'

class ScheduleForm extends Component {

    state = {
        ...this.returnStateObject()
    }

    returnStateObject() {
      if (this.props.currentIndex == -1)
        return {
          Код_пользователя: '',
          ФИО: '',
          Должность: '',
          Роль: ''
        }
      else {
        for (var key in this.props.list) {
          if (this.props.currentIndex === this.props.list[key].Код_пользователя ) {
            return {
              Код_пользователя: this.props.list[key].Код_пользователя,
              ФИО: this.props.list[key].ФИО ,
              Должность: this.props.list[key].Должность,
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
          <input name="Код_пользователя" placeholder="Код_пользователя" onChange={this.handleInputChange} value={this.state.Код_пользователя} className="form__input"/>
          <input name="ФИО" placeholder="ФИО" onChange={this.handleInputChange} value={this.state.ФИО} className="form__input"/>
          <input name="Должность" placeholder="Должность" onChange={this.handleInputChange} value={this.state.Должность} className="form__input"/>
          <input name="Роль" placeholder="Роль" onChange={this.handleInputChange} value={this.state.Роль} className="form__input"/>
          <button className="form__submit" type="submit">Отправить</button>
        </form>
      )
    }
}

export default ScheduleForm