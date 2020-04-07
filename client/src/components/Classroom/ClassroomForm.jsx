import React, { Component } from 'react'

class ClassroomForm extends Component {

    state = {
        ...this.returnStateObject()
    }

    returnStateObject() {
      if (this.props.currentIndex == -1)
        return {
          Код_аудитории: '',
          Название: ''
        }
      else {
        for (var key in this.props.list) {
          if (this.props.currentIndex === this.props.list[key].Код_аудитории ) {
            return {
              Код_аудитории: this.props.list[key].Код_аудитории,
              Название: this.props.list[key].Название
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
          <input name="Код_аудитории" placeholder="Код_аудитории" onChange={this.handleInputChange} value={this.state.Код_аудитории} className="form__input"/>
          <input name="Название" placeholder="Название" onChange={this.handleInputChange} value={this.state.Название} className="form__input"/>
          <button className="form__submit" type="submit">Отправить</button>
        </form>
      )
    }
}

export default ClassroomForm