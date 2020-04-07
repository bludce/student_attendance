import React, { Component } from 'react'

class TypeForm extends Component {

    state = {
        ...this.returnStateObject()
    }

    returnStateObject() {
      if (this.props.currentIndex == -1)
        return {
          Код_вида_занятия: '',
          Название: '',
          Описание: ''
        }
      else {
        for (var key in this.props.list) {
          if (this.props.currentIndex === this.props.list[key].Код_вида_занятия ) {
            return {
              Код_вида_занятия: this.props.list[key].Код_вида_занятия,
              Название: this.props.list[key].Название ,
              Описание: this.props.list[key].Описание 
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
          <input name="Код_вида_занятия" placeholder="Код_вида_занятия" onChange={this.handleInputChange} value={this.state.Код_вида_занятия} className="form__input"/>
          <input name="Название" placeholder="Название" onChange={this.handleInputChange} value={this.state.Название} className="form__input"/>
          <input name="Описание" placeholder="Описание" onChange={this.handleInputChange} value={this.state.Описание} className="form__input"/>
          <button className="form__submit" type="submit">Отправить</button>
        </form>
      )
    }
}

export default TypeForm